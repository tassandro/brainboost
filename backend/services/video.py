from http.client import HTTPException
import openai
from sqlalchemy.orm import Session
from models.models import Video, Question
from typing import List
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from dotenv import load_dotenv
import os
import json 
import uuid
import re

def generate_unique_id():
    return uuid.uuid4().hex[:10]  

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")  

def extract_video_id(video_link: str) -> str:
    patterns = [
        r"(?:v=)([a-zA-Z0-9_-]{11})",          
        r"(?:youtu\.be/)([a-zA-Z0-9_-]{11})"
    ]
    
    for pattern in patterns:
        match = re.search(pattern, video_link)
        if match:
            return match.group(1)
    
    raise Exception(f"Não foi possível extrair o ID do vídeo do link: {video_link}")


# Função para obter a transcrição do vídeo usando o YouTubeTranscriptApi
def get_video_transcription(video_link: str, language_code: str = 'pt') -> str:
    try:
        video_id = extract_video_id(video_link)
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[language_code])
        
        transcript_text = " ".join([entry["text"] for entry in transcript])
        return transcript_text

    except TranscriptsDisabled:
        raise Exception(f"Transcrição não disponível para o vídeo: {video_link}")
    except Exception as e:
        raise Exception(f"Erro ao recuperar transcrição: {str(e)}")
    
# Função para gerar o resumo 
def generate_openai_summary(transcript: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",  
        messages=[ 
            {"role": "system", "content": "Você é um assistente especializado em resumir conteúdos educacionais."},
            {"role": "user", "content": f"Explique o tema da aula de forma clara e objetiva, não fale nada sobre a aula em si, seja impessoal, divida a explicação em 5 parágrafos distintos. Não use numeração, listas ou marcadores.\n{transcript}"}
        ],
        max_tokens=200,  
        temperature=0.7  # Controle a criatividade do resumo
    )

    return response['choices'][0]['message']['content'].strip()

def generate_openai_questions(transcript: str) -> list:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[ 
                {"role": "system", "content": "Você é um assistente que cria perguntas de múltipla escolha e indica a alternativa correta."},
                {"role": "user", "content": f"""Crie EXATAMENTE 15 perguntas sobre o conteúdo a seguir, com alternativas numeradas (1, 2, 3, 4) e marque a resposta correta com um asterisco (*). Tome o tempo que precisar e não mencione o vídeo nas perguntas, apenas o tema ao qual o vídeo se refere

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
        
        for line in content.split('\n'):
            line = line.strip()
            
            if line.startswith("P:"):
                if current_question and current_question['alternatives'] and current_question['correct_answer']:
                    questions_data.append(current_question)
                
                current_question = {
                    'texto_questao': line[2:].strip(),  
                    'alternatives': [],
                    'correct_answer': ''
                }
            
            elif line.startswith(('1)', '2)', '3)', '4)')):
                if not current_question:
                    continue
                    
                parts = line.split(')', 1)
                if len(parts) < 2:
                    continue
                    
                alternative_text = parts[1].strip()
                is_correct = '*' in alternative_text
                
                clean_text = alternative_text.replace('*', '').strip()
                
                current_question['alternatives'].append(clean_text)
                
                if is_correct:
                    current_question['correct_answer'] = clean_text
        
        if current_question and current_question['alternatives'] and current_question['correct_answer']:
            questions_data.append(current_question)
        
        if len(questions_data) < 10:
            print(f"Aviso: Geradas apenas {len(questions_data)} perguntas.")
        
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
            lyrics_video=transcript,  
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