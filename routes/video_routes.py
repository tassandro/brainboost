from fastapi import APIRouter, Depends, HTTPException
from models.models import Video
from sqlalchemy.orm import Session, joinedload
from typing import List
from schemas.video_schemas import VideoRequest, VideoOut, QuestionResponse
from services.video import get_video_transcription, generate_openai_summary, generate_openai_questions, save_video_and_questions
from models.database import get_db
import json
import re

router = APIRouter()

# Rota para criar o vídeo, gerar o resumo e as questões
@router.post("/video", response_model=VideoOut)
async def create_video(video_data: VideoRequest, db: Session = Depends(get_db)):
    try:
        video_transcript = get_video_transcription(video_data.link_video)
        video_summary = generate_openai_summary(video_transcript)
        questions = generate_openai_questions(video_transcript)

        video = await save_video_and_questions(db, video_data.link_video, video_summary, video_transcript, questions)

        # Garante que o relacionamento está carregado corretamente
        video = db.query(Video).options(joinedload(Video.questions)).filter(Video.id_video == video.id_video).first()

        if not video or not video.questions:
            raise HTTPException(status_code=500, detail="As perguntas não foram salvas corretamente.")

        formatted_questions = []
        for q in video.questions:
            try:
                alternatives = json.loads(q.alternatives) if q.alternatives else []
                if (q.texto_questao and 
                    isinstance(alternatives, list) and 
                    len(alternatives) == 4 and
                    all(isinstance(alt, str) for alt in alternatives)):
                    
                    clean_question = re.sub(r'^\d+\.\s*', '', q.texto_questao).strip()
                    
                    formatted_questions.append(QuestionResponse(
                        id_question=q.id_question,
                        texto_questao=clean_question,
                        pontuacao=q.pontuacao,
                        alternatives=alternatives
                    ))
            except (json.JSONDecodeError, AttributeError):
                continue
        
        return VideoOut(
            id_video=video.id_video,
            link_video=video.link_video,
            resumo_video=video.resumo_video,
            questions=formatted_questions[:10]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
