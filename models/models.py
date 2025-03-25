from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
from nanoid import generate
import json

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=lambda: generate(size=10))  # Gerando o ID com nanoid
    full_name = Column(String, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # Relacionamento com Input
    inputs = relationship("Input", back_populates="user")


class Video(Base):
    __tablename__ = "video"
    
    id_video = Column(String, primary_key=True, index=True, default=lambda: generate(size=10))  
    link_video = Column(String, nullable=False)
    lyrics_video = Column(String, nullable=False)
    resumo_video = Column(String, nullable=False)
    
    # Relacionamento com Question
    questions = relationship("Question", back_populates="video")


class Input(Base):
    __tablename__ = "input"
    
    id_input = Column(String, primary_key=True, index=True, default=lambda: generate(size=10))
    id_user = Column(String, ForeignKey("users.id"), nullable=False)  
    id_video = Column(String, ForeignKey("video.id_video"), nullable=False)  
    data_input = Column(DateTime, default=datetime.now())  

    # Relacionamento com User e Video
    user = relationship("User", back_populates="inputs")
    video = relationship("Video")


class Question(Base):
    __tablename__ = "questions"
    
    id_question = Column(String, primary_key=True, index=True, default=lambda: generate(size=10))  
    id_video = Column(String, ForeignKey("video.id_video"))
    texto_questao = Column(String, nullable=False)
    pontuacao = Column(Integer, default=0)
    alternatives = Column(String)  # Agora é String, armazenaremos a lista como JSON string
    
    # Relacionamento com Video
    video = relationship("Video", back_populates="questions")

    @property
    def alternatives_list(self):
        """Retorna as alternativas como lista de strings."""
        return json.loads(self.alternatives) if self.alternatives else []

    @alternatives_list.setter
    def alternatives_list(self, value):
        """Define as alternativas a partir de uma lista de strings."""
        self.alternatives = json.dumps(value) if value else json.dumps([])
