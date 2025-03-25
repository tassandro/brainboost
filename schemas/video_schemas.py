from pydantic import BaseModel

class VideoCreate(BaseModel):
    link_video: str


class VideoResponse(VideoCreate):
    id_video: str
    lyrics_video: str
    resumo_video: str

    class Config:
        orm_mode = True
