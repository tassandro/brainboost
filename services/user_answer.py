from sqlalchemy.orm import Session
from models.models import Question, Input
from schemas.answer_schemas import AnswerSubmission
from fastapi import HTTPException
from datetime import datetime

def calculate_score(db: Session, answer_submission: AnswerSubmission):
    questions = db.query(Question).filter(Question.id_video == answer_submission.id_video).all()
    
    if not questions:
        raise HTTPException(status_code=404, detail="Nenhuma questão encontrada para este vídeo.")

    correct_answers = {q.id_question: q.correct_answer for q in questions}

    correct_count = sum(1 for answer in answer_submission.answers if correct_answers.get(answer.id_question) == answer.answer)

    total_questions = len(questions)
    score = (correct_count / total_questions) * 100 if total_questions > 0 else 0

    input_entry = db.query(Input).filter(
        Input.id_user == answer_submission.id_user,
        Input.id_video == answer_submission.id_video
    ).first()

    if input_entry:
        input_entry.score = score
    else:
        input_entry = Input(
            id_user=answer_submission.id_user,
            id_video=answer_submission.id_video,
            data_input=datetime.now(),  
            score=score
        )
        db.add(input_entry)  
    
    db.commit()  
    return {"score": score}
