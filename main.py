from fastapi import FastAPI
from models.database import engine, Base
from routes import user_routes, video_routes, user_answer_routes

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_routes.router)
app.include_router(video_routes.router)
app.include_router(user_answer_routes.router)

@app.get("/")
def home():
    return {"message": "API está rodando!"}