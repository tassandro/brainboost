from pydantic import BaseModel

class UserVideoScores(BaseModel):
    id_video: str
    link_video: str
    resumo_video: str
    score: float
