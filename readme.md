# BrainBoost

Bem-vindo ao **BrainBoost** - uma plataforma inovadora para aprendizado dinâmico!  
Este projeto tem como objetivo oferecer um ambiente interativo onde os usuários podem acessar resumos automáticos de vídeos educacionais e responder a quizzes gerados com base no conteúdo assistido.

---

## 🛠 Tecnologias Utilizadas

- **Backend**: FastAPI (Python)  
- **Banco de Dados**: SQLite  
- **Frontend**: React + TailWind + Craco 
- **App Mobile**: React Native  
- **Integração com IA**: youtube_transcript_api e OpenAI GPT-4 para transcrição e geração de conteúdo, respectivamente  
- **Autenticação**: JWT para segurança do login

---

## 📌 Descrição 

O **BrainBoost** permite que os usuários:

- Criem perfis personalizados.  
- Enviem links de vídeos do YouTube para transcrição automática.  
- Recebam resumos gerados por IA com base no conteúdo do vídeo.  
- Participem de quizzes.  
- Acompanhem seu desempenho.
---

## 🏗 Estrutura

O projeto está dividido em três partes principais:

### API Backend  
Desenvolvida em **Python** utilizando **FastAPI**, responsável por autenticação, processamento de transcrição, geração de resumos e perguntas, além do gerenciamento de usuários.

### Frontend Web  
Desenvolvido em **React**, responsável por fornecer uma interface amigável para os usuários acessarem seus resumos e quizzes.

### App Mobile  
Construído com **React Native**, permitindo que os usuários acessem o **BrainBoost** de forma otimizada em dispositivos móveis.

Nosso objetivo é tornar o aprendizado mais acessível e interativo, proporcionando uma experiência personalizada e gamificada para cada usuário. 

---

## 🚀 Execução do Projeto

Para rodar o projeto localmente utilizando Docker, siga os passos abaixo:

1. Certifique-se de ter o **Docker** e o **Docker Compose** instalados.
2. Abra o Docker Desktop e faça o login.
3. Navegue até o diretório **brainboost**.
4. Execute o seguinte comando:
   ```sh
   docker compose up --build
   ```

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

- **Backend**: `http://localhost:8080`
- **Frontend**: `http://localhost:3000`

---

## 🔧 Configuração de Variáveis de Ambiente

Certifique-se de criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```ini
SECRET_KEY="insira_sua_chave"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY="insira_sua_chave"
```

### Descrição das Variáveis:

- **SECRET_KEY**: Chave secreta usada para assinar tokens JWT.
- **ALGORITHM**: Algoritmo utilizado na autenticação JWT.
- **ACCESS_TOKEN_EXPIRE_MINUTES**: Tempo de expiração do token de acesso em minutos.
- **OPENAI_API_KEY**: Chave de API para integração com o OpenAI GPT-4.
