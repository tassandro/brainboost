from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from schemas.video_schemas import VideoRequest, VideoOut, QuestionResponse
from services.video import get_video_transcription, generate_openai_summary, generate_openai_questions, save_video_and_questions
from models.database import get_db
from services.auth import get_user_from_token
import json

# Configuração do esquema OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

router = APIRouter()

@router.post("/video", response_model=VideoOut)
async def create_video(
    video_data: VideoRequest, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    user = get_user_from_token(db, token)  # Garante que apenas usuários logados possam acessar
    try:
        video_transcript = get_video_transcription(video_data.link_video)
        video_summary = generate_openai_summary(video_transcript)
        questions = generate_openai_questions(video_transcript)

        # Validação adicional
        if len(questions) < 10:
            raise HTTPException(status_code=500, detail="Não foram geradas perguntas suficientes")
        
        if any(not q.get('correct_answer') for q in questions):
            raise HTTPException(status_code=500, detail="Algumas perguntas não têm resposta correta")

        video = await save_video_and_questions(db, video_data.link_video, video_summary, video_transcript, questions)

        # Formatação da resposta
        formatted_questions = []
        for q in video.questions:
            try:
                alts = json.loads(q.alternatives) if q.alternatives else []
                if not q.correct_answer or q.correct_answer not in alts:
                    continue
                    
                formatted_questions.append(QuestionResponse(
                    id_question=q.id_question,
                    texto_questao=q.texto_questao,
                    pontuacao=q.pontuacao,
                    alternatives=alts,
                    correct_answer=q.correct_answer
                ))
            except Exception:
                continue

        return VideoOut(
            id_video=video.id_video,
            link_video=video.link_video,
            resumo_video=video.resumo_video,
            questions=formatted_questions[:10]  
        )

    except HTTPException as http_err:
        raise http_err  
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar vídeo: {str(e)}")