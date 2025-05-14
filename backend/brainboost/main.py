from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.database import engine, Base
from routes import user_routes, video_routes, user_answer_routes, user_videos

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Libera o frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(user_routes.router)
app.include_router(video_routes.router)
app.include_router(user_answer_routes.router)
app.include_router(user_videos.router)


@app.get("/")
def home():
    return {"message": "API está rodando!"}
