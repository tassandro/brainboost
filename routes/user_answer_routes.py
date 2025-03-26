from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from schemas.answer_schemas import AnswerSubmission
from services.user_answer import calculate_score
from services.auth import get_user_from_token
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

@router.post("/submit_answers/")
def submit_answers(
    answer_submission: AnswerSubmission,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)  # Obtém o token do header Authorization
):
    current_user = get_user_from_token(db, token)  # Autentica o usuário

    # Garante que o usuário só possa enviar respostas dele mesmo
    if answer_submission.id_user != current_user.id:
        raise HTTPException(status_code=403, detail="Usuário não autorizado.")

    return calculate_score(db, answer_submission)
