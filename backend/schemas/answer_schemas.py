from pydantic import BaseModel
from typing import List

class UserAnswer(BaseModel):
    id_question: str
    answer: str

class AnswerSubmission(BaseModel):
    id_user: str
    id_video: str
    answers: List[UserAnswer]