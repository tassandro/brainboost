from pydantic import BaseModel, field_validator
from typing import List


# Schema para a requisição do vídeo (usuário envia o link do vídeo)
class VideoRequest(BaseModel):
    link_video: str  # Link do vídeo fornecido pelo usuário

# Schema para a resposta de cada pergunta do quiz
class QuestionResponse(BaseModel):
    id_question: str
    texto_questao: str
    pontuacao: int
    alternatives: List[str] = []  # Valor padrão: lista vazia
    correct_answer: str

    @field_validator('alternatives')
    def validate_alternatives(cls, v):
        if v is None:
            return []
        return v

# Schema para a saída do vídeo (detalhes do vídeo com suas questões)
class VideoOut(BaseModel):
    id_video: str  # ID único do vídeo gerado
    link_video: str  # Link do vídeo
    resumo_video: str  # Resumo gerado a partir da transcrição do vídeo
    questions: List[QuestionResponse] = []  # Lista das questões geradas para o quiz

    class Config:
        from_attributes = True  # Permite trabalhar com objetos do SQLAlchemy diretamente