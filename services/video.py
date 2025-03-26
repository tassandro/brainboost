from http.client import HTTPException
import openai
from sqlalchemy.orm import Session, joinedload
from models.models import Video, Question
from typing import List
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from youtube_transcript_api.formatters import TextFormatter
from pydantic import BaseModel
from datetime import datetime
from schemas.video_schemas import VideoOut, QuestionResponse
from models.database import get_db
from dotenv import load_dotenv
import os
import json  
import re
import uuid

def generate_unique_id():
    return uuid.uuid4().hex[:10]  # Gera um ID único de 10 caracteres

load_dotenv()

# Agora você pode acessar a variável de ambiente
openai.api_key = os.getenv("OPENAI_API_KEY")  # Carregar a chave API da OpenAI

# Função para obter a transcrição do vídeo usando o YouTubeTranscriptApi
def get_video_transcription(video_link: str, language_code: str = 'pt') -> str:
    try:
        video_id = video_link.split("v=")[-1]  
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[language_code])  # Busca transcrição em português (pt)
        
        # Formatação da transcrição para texto
        transcript_text = " ".join([entry["text"] for entry in transcript])
        return transcript_text

    except TranscriptsDisabled:
        raise Exception(f"Transcrição não disponível para o vídeo: {video_link}")
    except Exception as e:
        raise Exception(f"Erro ao recuperar transcrição: {str(e)}")
    
# Função para gerar o resumo usando o modelo gpt-3.5-turbo
def generate_openai_summary(transcript: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Usando o modelo de conversação gpt-3.5-turbo
        messages=[ 
            {"role": "system", "content": "Você é um assistente especializado em resumir conteúdos educacionais."},
            {"role": "user", "content": f"Explique o tema da aula de forma clara e objetiva, não fale nada sobre a aula em si, seja impessoal, divida a explicação em 5 parágrafos distintos. Não use numeração, listas ou marcadores.\n{transcript}"}
        ],
        max_tokens=200,  # Ajuste conforme necessário
        temperature=0.7  # Controle a criatividade do resumo
    )

    return response['choices'][0]['message']['content'].strip()

def generate_openai_questions(transcript: str) -> list:
    try:
        # Ajuste do prompt para gerar 10 perguntas
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[ 
                {"role": "system", "content": "Você é um assistente que cria perguntas de múltipla escolha e indica a alternativa correta."},
                {"role": "user", "content": f"""Crie EXATAMENTE 13perguntas sobre o conteúdo a seguir, com alternativas numeradas (1, 2, 3, 4) e marque a resposta correta com um asterisco (*). Tome o tempo que precisar e não mencione o vídeo nas perguntas, apenas o tema ao qual o vídeo se

Exemplo de formato esperado:
P: Qual é o resultado de 15 dividido por 5?
1) 2
2) 3 *
3) 4
4) O método para dividir números grandes

Conteúdo do vídeo: {transcript}"""}
            ],
            temperature=0.7,
            max_tokens=2000
        )

        content = response['choices'][0]['message']['content']
        
        questions_data = []
        current_question = None
        
        # Processa o conteúdo retornado para identificar perguntas e alternativas
        for line in content.split('\n'):
            line = line.strip()
            
            # Identifica uma nova pergunta
            if line.startswith("P:"):
                # Se já temos uma pergunta em processamento, adiciona ao resultado
                if current_question and current_question['alternatives'] and current_question['correct_answer']:
                    questions_data.append(current_question)
                
                # Inicia nova pergunta
                current_question = {
                    'texto_questao': line[2:].strip(),  # Remove o "P:"
                    'alternatives': [],
                    'correct_answer': ''
                }
            
            # Identifica alternativas (1), 2), etc.)
            elif line.startswith(('1)', '2)', '3)', '4)')):
                if not current_question:
                    continue
                    
                # Separa o número da alternativa do texto
                parts = line.split(')', 1)
                if len(parts) < 2:
                    continue
                    
                alternative_text = parts[1].strip()
                is_correct = '*' in alternative_text
                
                # Remove o asterisco se existir
                clean_text = alternative_text.replace('*', '').strip()
                
                current_question['alternatives'].append(clean_text)
                
                # Se for a resposta correta, guarda o texto limpo
                if is_correct:
                    current_question['correct_answer'] = clean_text
        
        # Adiciona a última pergunta processada, se válida
        if current_question and current_question['alternatives'] and current_question['correct_answer']:
            questions_data.append(current_question)
        
        # Garante que temos exatamente 10 perguntas
        if len(questions_data) < 10:
            print(f"Aviso: Geradas apenas {len(questions_data)} perguntas.")
        
        # Limita a 10 perguntas
        questions_data = questions_data[:10]
        
        
        return questions_data

    except Exception as e:
        print("Erro ao gerar perguntas:", e)
        return []


async def save_video_and_questions(db: Session, video_link: str, video_summary: str, transcript: str, questions: List[dict]):
    try:
        video_id = generate_unique_id()
        video = Video(
            id_video=video_id,
            link_video=video_link,
            resumo_video=video_summary,
            lyrics_video=transcript,  # Alterado para 'lyrics_video' ou 'transcript_video'
        )
        db.add(video)
        db.commit()

        for question_data in questions:
            if not question_data.get('texto_questao') or len(question_data.get('alternatives', [])) != 4:
                print(f"Pergunta inválida ignorada: {question_data.get('texto_questao')}")
                continue

            question = Question(
                id_video=video.id_video,
                texto_questao=question_data['texto_questao'],
                pontuacao=0,
                alternatives=json.dumps(question_data['alternatives']),
                correct_answer=question_data['correct_answer']
            )
            db.add(question)

        db.commit()
        return video

    except Exception as e:
        db.rollback()
        print(f"Erro ao salvar vídeo e perguntas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao salvar dados")
