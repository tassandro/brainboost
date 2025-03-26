from sqlalchemy.orm import Session
from models.models import Question, Input
from schemas.answer_schemas import AnswerSubmission
from fastapi import HTTPException
from datetime import datetime

def calculate_score(db: Session, answer_submission: AnswerSubmission):
    # Buscar as questões associadas ao vídeo
    questions = db.query(Question).filter(Question.id_video == answer_submission.id_video).all()
    
    if not questions:
        raise HTTPException(status_code=404, detail="Nenhuma questão encontrada para este vídeo.")

    # Criar um dicionário {id_question: resposta_correta}
    correct_answers = {q.id_question: q.correct_answer for q in questions}

    # Contar acertos
    correct_count = sum(1 for answer in answer_submission.answers if correct_answers.get(answer.id_question) == answer.answer)
    
    # Calcular percentual de acerto
    total_questions = len(questions)
    score = (correct_count / total_questions) * 100 if total_questions > 0 else 0

    # Atualizar ou criar a entrada de usuário no banco de dados
    input_entry = db.query(Input).filter(
        Input.id_user == answer_submission.id_user,
        Input.id_video == answer_submission.id_video
    ).first()

    if input_entry:
        # Se a entrada já existe, atualiza o score
        input_entry.score = score
    else:
        # Se a entrada não existe, cria uma nova
        input_entry = Input(
            id_user=answer_submission.id_user,
            id_video=answer_submission.id_video,
            data_input=datetime.now(),  # Define a data/hora atual
            score=score
        )
        db.add(input_entry)  # Adiciona a nova entrada no banco de dados
    
    db.commit()  # Não se esqueça de realizar o commit para salvar a entrada ou atualização
    return {"score": score}
