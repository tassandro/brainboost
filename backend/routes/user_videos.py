import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from models.database import get_db
from models.models import Input, Video
from services.auth import get_user_from_token
from schemas.user_video_score import UserVideoScores

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
router = APIRouter()

@router.get("/profile", response_model=list[UserVideoScores])
def get_user_videos_scores(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """
    Retorna os vídeos assistidos por um usuário junto com as pontuações obtidas.
    """
    user = get_user_from_token(db, token)  # Autentica o usuário
    
    # Busca todas as entradas da tabela Input para esse usuário
    user_inputs = db.query(Input).filter(Input.id_user == user.id).all()
    
    if not user_inputs:
        raise HTTPException(status_code=404, detail="Nenhum vídeo encontrado para este usuário.")
    
    videos_scores = []
    
    for user_input in user_inputs:
        video = db.query(Video).filter(Video.id_video == user_input.id_video).first()
        if not video:
            continue  # Se o vídeo não existir, ignora a entrada
        videos_scores.append(UserVideoScores(
            id_video=video.id_video,
            link_video=video.link_video,
            resumo_video=video.resumo_video,
            score=user_input.score if user_input.score is not None else 0
        ))
    return videos_scores
