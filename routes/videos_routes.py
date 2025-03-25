from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import jwt, JWTError
from typing import List
import re  # Para validação do link

from models.database import get_db
from models.models import Video
from schemas.video_schemas import VideoCreate, VideoResponse
from services.auth import hash_password, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

router = APIRouter()

def is_valid_youtube_link(link: str) -> bool:
    youtube_regex = r'(https?://)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)/.*(?:v=|embed\/|e\/|videoseries\?v=)([a-zA-Z0-9_-]+)'
    return re.match(youtube_regex, link) is not None

# Criar um vídeo (POST)
@router.post("/videos/", response_model=VideoResponse)
def create_video(video: VideoCreate, db: Session = Depends(get_db)):
    # Verificar se o link é do YouTube
    if not is_valid_youtube_link(video.link_video):
        raise HTTPException(status_code=400, detail="O link fornecido não é um link válido do YouTube")
    
    # Verificar se o vídeo já está cadastrado
    if db.query(Video).filter(Video.link_video == video.link_video).first():
        raise HTTPException(status_code=400, detail="Vídeo já cadastrado")
    
    # Criar o vídeo no banco
    new_video = Video(link_video=video.link_video)  # Sem passar as informações de lyrics e resumo
    
    db.add(new_video)
    db.commit()
    db.refresh(new_video)
    
    return new_video

# Pegar todos os vídeos (GET)
@router.get("/videos/", response_model=List[VideoResponse])
def get_all_videos(db: Session = Depends(get_db)):
    return db.query(Video).all()

# Atualizar um vídeo (PUT)
@router.put("/videos/{id_video}", response_model=VideoResponse)
def update_video(id_video: str, video_data: VideoCreate, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.id_video == id_video).first()
    if not video:
        raise HTTPException(status_code=404, detail="Vídeo não encontrado")
    
    for key, value in video_data.dict().items():
        setattr(video, key, value)

    db.commit()
    db.refresh(video)
    return video

# Deletar um vídeo (DELETE)
@router.delete("/videos/{id_video}")
def delete_video(id_video: str, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.id_video == id_video).first()
    if not video:
        raise HTTPException(status_code=404, detail="Vídeo não encontrado")
    
    db.delete(video)
    db.commit()
    return {"message": "Vídeo deletado com sucesso"}