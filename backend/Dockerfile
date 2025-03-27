# Etapa 1: Imagem base do Python
FROM python:3.12-slim

# Etapa 2: Instalar dependências de sistema (como libsqlite3-dev)
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Etapa 3: Instalar dependências do projeto com Poetry
WORKDIR /app

# Copiar arquivos necessários para o projeto
COPY pyproject.toml poetry.lock /app/

# Instalar dependências do Poetry
RUN pip install poetry
RUN poetry install

# Etapa 4: Copiar o código da aplicação
COPY . /app/

# COPY env /app/.env


# Expor a porta que o FastAPI vai rodar
EXPOSE 8080

# Etapa 5: Comando para rodar a aplicação com Uvicorn
CMD ["poetry", "run","uvicorn", "brainboost.main:app", "--host", "0.0.0.0", "--port", "8080"]

