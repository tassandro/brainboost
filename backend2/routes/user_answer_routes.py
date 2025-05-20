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
    token: str = Depends(oauth2_scheme)
):
    current_user = get_user_from_token(db, token)

    return calculate_score(db, answer_submission, current_user.id)