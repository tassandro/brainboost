from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from typing import List

from models.database import get_db
from models.models import User
from schemas.user_schemas import UserCreate, Token, UserOut
from services.auth import (
    hash_password, verify_password, create_access_token,
    get_user_from_token, ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# Rota de Registro de Usuário
@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    user_exists = db.query(User).filter(User.username == user_data.username).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Username já está em uso")
    
    hashed_pw = hash_password(user_data.password)
    new_user = User(full_name=user_data.full_name, username=user_data.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token({"sub": new_user.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# Rota de Login de Usuário
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    
    access_token = create_access_token({"sub": user.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# Rota para obter o usuário atual (dados do usuário logado)
@router.get("/users/me", response_model=UserOut)
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = get_user_from_token(db, token)
    return UserOut.from_orm(user)

# Rota de Obter Usuário por ID
@router.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

# Rota de Atualizar Usuário
@router.put("/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: str,
    user_data: UserCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)  # Exige que o usuário esteja logado
):
    # Obtém o usuário logado a partir do token
    user_authenticated = get_user_from_token(db, token)

    # Verifica se o usuário logado está tentando atualizar seu próprio perfil
    if user_authenticated.id != user_id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para modificar este usuário")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    user.full_name = user_data.full_name
    user.username = user_data.username
    if user_data.password:
        user.hashed_password = hash_password(user_data.password)
    
    db.commit()
    db.refresh(user)
    return user

@router.delete("/users/{user_id}", response_model=UserOut)
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)  # Exige que o usuário esteja logado
):
    # Obtém o usuário logado a partir do token
    user_authenticated = get_user_from_token(db, token)

    # Verifica se o usuário logado está tentando excluir seu próprio perfil
    if user_authenticated.id != user_id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para excluir este usuário")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    db.delete(user)
    db.commit()
    return user

@router.get("/users", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users