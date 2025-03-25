from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
from nanoid import generate 

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
    link_video = Column(String, unique=True, nullable=True)
    #yrics_video = Column(String, nullable=True)
    resumo_video = Column(String, nullable=True)
    
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
    
    # Relacionamento com Video
    video = relationship("Video", back_populates="questions")
