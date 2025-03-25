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
import json  # Importando o módulo json
import re

# Carregar variáveis de ambiente do arquivo .env
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
            {"role": "user", "content": f"Explique o tema da aula de forma clara e objetiva, não fale nada sobre a aula em si, seja impessoal, divida a explicação em 5 parágrafos distintos.Não use numeração, listas ou marcadores.\n{transcript}"}
        ],
        max_tokens=200,  # Ajuste conforme necessário
        temperature=0.7  # Controle a criatividade do resumo
    )

    return response['choices'][0]['message']['content'].strip()

def generate_openai_questions(transcript: str) -> List[dict]:
    try:
        print("Iniciando chamada à API do OpenAI para gerar perguntas...")  # Iniciar rastreamento

        # Chamada à API do OpenAI para gerar as perguntas
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[ 
                {"role": "system", "content": "Você é um assistente que cria perguntas de múltipla escolha com alternativas numéricas ou texto explicativo."},
                {"role": "user", "content": f"""Crie EXATAMENTE 10 perguntas sobre o vídeo, com alternativas numéricas (como 1, 2, 3, 4) ou baseadas em texto relevante, conforme o conteúdo do vídeo. Cada alternativa deve estar relacionada ao vídeo. Mas você não deve fazer menção nenhuma ao vídeo em nenhuma pergunta, apenas ao tema dele.

Exemplo de formato:
P: Qual é o resultado da divisão de 15 por 5?
Alternativas:
1) 2
2) 3
3) 4
4) O método para dividir números grandes

Conteúdo do vídeo: {transcript}"""}
            ],
            temperature=0.7,
            max_tokens=2000
        )

        print("Resposta da API recebida:", response)  # Exibe a resposta completa da API

        # Verificar se a resposta contém perguntas
        if 'choices' not in response or len(response['choices']) == 0:
            print("Resposta da API não contém escolhas válidas.")  # Informar se não encontrou a chave 'choices'
            return []

        content = response['choices'][0]['message']['content']
        print("Conteúdo extraído da resposta:", content)  # Exibe o conteúdo extraído

        if not content:
            print("Conteúdo vazio na resposta!")  # Verifica se o conteúdo é vazio
            return []

        questions = []
        current_question = None

        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('P:'):
                if current_question and len(current_question['alternatives']) == 4:
                    questions.append(current_question)
                question_text = line[2:].strip()
                current_question = {
                    'question_text': question_text,
                    'score': 0,
                    'alternatives': []
                }
            elif line.startswith(('1)', '2)', '3)', '4)')) and current_question:
                alternative_text = re.sub(r'^\d\)\s*', '', line).strip()  # Limpa a numeração (1), (2), etc.
                current_question['alternatives'].append(alternative_text)

        # Adiciona a última pergunta se estiver completa
        if current_question and len(current_question['alternatives']) == 4:
            questions.append(current_question)
        
        print("Perguntas extraídas:", questions)  # Exibe as perguntas extraídas
        return questions[:10]  # Garante no máximo 10 perguntas

    except Exception as e:
        print(f"Erro ao gerar perguntas: {e}")
        return []

async def save_video_and_questions(db: Session, video_link: str, video_summary: str, transcript: str, questions: List[dict]):
    try:
        existing_video = db.query(Video).filter(Video.link_video == video_link).first()

        if not existing_video:
            video = Video(link_video=video_link, lyrics_video=transcript, resumo_video=video_summary)
            db.add(video)
            db.commit()
            db.refresh(video)
        else:
            existing_video.lyrics_video = transcript
            existing_video.resumo_video = video_summary
            db.commit()
            db.refresh(existing_video)
            video = existing_video

        for question_data in questions:
            if (not question_data.get('question_text') or 
                not isinstance(question_data.get('alternatives'), list) or 
                len(question_data['alternatives']) != 4):
                continue  

            question = Question(
                id_video=video.id_video,
                texto_questao=question_data['question_text'],
                pontuacao=0,
                alternatives=json.dumps(question_data['alternatives'])
            )
            db.add(question)

        db.commit()
        
        # Agora, garantimos que as perguntas são carregadas corretamente
        video = db.query(Video).options(joinedload(Video.questions)).filter(Video.id_video == video.id_video).first()
        
        return video
    except Exception as e:
        print(f"Erro ao salvar o vídeo e perguntas: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar vídeo e perguntas")