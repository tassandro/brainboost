# (POST)
# http://localhost:8000/login
username admin
password admin

## response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0NTYwNTkxMH0.rbxzMjYs2OEnpEs8feS_bKFYTts2LqRT1CskJROuQn8",
  "token_type": "bearer"
}

# (GET) TOKEN BEARER
# http://localhost:8000/profile

## Response
[
  {
    "id_video": "1281928214",
    "link_video": "https://www.youtube.com/watch?v=WUH6V3hXWp8",
    "resumo_video": "O tema da aula é a derivação parcial implícita, um conceito fundamental no cálculo diferencial. A derivação parcial é usada para determinar a inclinação de uma superfície em uma direção específica, neste caso, o eixo Y. Para entender a inclinação da superfície na direção do eixo Y, é necessário calcular a derivada parcial da superfície em relação ao eixo Y.\n\nDurante o cálculo da derivada parcial, é importante reconhecer que a função é dependente das variáveis X e Y. Isso significa que, ao calcular a derivada parcial em relação a Y, é necessário aplicar a regra da cadeia para considerar a dependência das variáveis. A regra da cadeia é um procedimento usado em cálculo para derivar uma função composta.\n\nO cálculo envolve várias etapas",
    "score": 100.0
  }
]


# (GET)
# http://localhost:8000/users/me

## Response:
{
  "id": "40MGza8ytV",
  "full_name": "admin",
  "username": "admin"
}

# (POST) TOKEN BEARER
# http://localhost:8000/video

{
  "link_video":"https://www.youtube.com/watch?v=WUH6V3hXWp8"
}

## Response
{
  "id_video": "1281928214",
  "link_video": "https://www.youtube.com/watch?v=WUH6V3hXWp8",
  "resumo_video": "O tema da aula é a derivação parcial implícita, um conceito fundamental no cálculo diferencial. A derivação parcial é usada para determinar a inclinação de uma superfície em uma direção específica, neste caso, o eixo Y. Para entender a inclinação da superfície na direção do eixo Y, é necessário calcular a derivada parcial da superfície em relação ao eixo Y.\n\nDurante o cálculo da derivada parcial, é importante reconhecer que a função é dependente das variáveis X e Y. Isso significa que, ao calcular a derivada parcial em relação a Y, é necessário aplicar a regra da cadeia para considerar a dependência das variáveis. A regra da cadeia é um procedimento usado em cálculo para derivar uma função composta.\n\nO cálculo envolve várias etapas",
  "questions": [
    {
      "id_question": "lyiLbh4FVj",
      "texto_questao": "Qual o tema principal da aula do vídeo?",
      "pontuacao": 0,
      "alternatives": [
        "Equações diferenciais",
        "Derivação parcial implícita",
        "Trigonometria",
        "Álgebra linear"
      ],
      "correct_answer": "Derivação parcial implícita"
    },
    {
      "id_question": "GWVBp9hT5R",
      "texto_questao": "Qual é a inclinação de uma esfera em relação a qual eixo que a aula procura encontrar?",
      "pontuacao": 0,
      "alternatives": [
        "Eixo X",
        "Eixo Y",
        "Eixo Z",
        "Nenhum dos anteriores"
      ],
      "correct_answer": "Eixo Y"
    },
    {
      "id_question": "_SRvpfMzx-",
      "texto_questao": "A derivada parcial de uma superfície em relação ao eixo Y determina o que?",
      "pontuacao": 0,
      "alternatives": [
        "O volume da superfície",
        "A inclinação da superfície na direção do eixo Y",
        "A aceleração da superfície no eixo Y",
        "A velocidade da superfície no eixo Y"
      ],
      "correct_answer": "A inclinação da superfície na direção do eixo Y"
    },
    {
      "id_question": "RTKejnCKYI",
      "texto_questao": "O valor de Z depende de quais variáveis?",
      "pontuacao": 0,
      "alternatives": [
        "Apenas X",
        "Apenas Y",
        "X e Y",
        "Nenhuma das anteriores"
      ],
      "correct_answer": "X e Y"
    },
    {
      "id_question": "RFGowUH7w_",
      "texto_questao": "Ao calcular a derivada parcial, quais lados você deve considerar?",
      "pontuacao": 0,
      "alternatives": [
        "Apenas a esquerda",
        "Apenas a direita",
        "Ambos, esquerda e direita",
        "Nenhum dos anteriores"
      ],
      "correct_answer": "Ambos, esquerda e direita"
    },
    {
      "id_question": "vJXXfv37nP",
      "texto_questao": "Qual é a derivada de uma constante?",
      "pontuacao": 0,
      "alternatives": [
        "1",
        "0",
        "A própria constante",
        "Não pode ser determinada"
      ],
      "correct_answer": "0"
    },
    {
      "id_question": "nhHCAyjeSh",
      "texto_questao": "O que é necessário para calcular a derivada de uma função que depende de duas variáveis?",
      "pontuacao": 0,
      "alternatives": [
        "A regra do produto",
        "A regra da cadeia",
        "A regra do quociente",
        "A regra da potência"
      ],
      "correct_answer": "A regra da cadeia"
    },
    {
      "id_question": "CuvGmuJsle",
      "texto_questao": "A derivada parcial de Z em relação a Y é igual a que expressão?",
      "pontuacao": 0,
      "alternatives": [
        "Z / Y",
        "-Y / Z",
        "Y / Z",
        "-Z / Y"
      ],
      "correct_answer": "-Y / Z"
    },
    {
      "id_question": "eC7sUcWJzL",
      "texto_questao": "Quais são os valores de X, Y e Z dados na questão?",
      "pontuacao": 0,
      "alternatives": [
        "X=1, Y=2, Z=3",
        "X=2, Y=1/3, Z=2",
        "X=0, Y=1, Z=1",
        "X=2, Y=2, Z=1"
      ],
      "correct_answer": "X=2, Y=1/3, Z=2"
    },
    {
      "id_question": "ZvoW1yai4l",
      "texto_questao": "O que acontece quando uma constante é derivada?",
      "pontuacao": 0,
      "alternatives": [
        "O resultado é a própria constante",
        "O resultado é zero",
        "O resultado é um",
        "O resultado é indefinido"
      ],
      "correct_answer": "O resultado é zero"
    }
  ]
}

# (POST)
# http://localhost:8000/submit_answers/

{
  "id_video": "1281928214",
  "answers": [
    {
      "id_question": "lyiLbh4FVj",
      "answer": "Derivação parcial implícita"
    },
    {
      "id_question": "GWVBp9hT5R",
      "answer": "Eixo Y"
    },
    {
      "id_question": "_SRvpfMzx-",
      "answer": "A inclinação da superfície na direção do eixo Y"
    },
    {
      "id_question": "RTKejnCKYI",
      "answer": "X e Y"
    },
    {
      "id_question": "RFGowUH7w_",
      "answer": "Ambos, esquerda e direita"
    },
    {
      "id_question": "vJXXfv37nP",
      "answer": "0"
    },
    {
      "id_question": "nhHCAyjeSh",
      "answer": "A regra da cadeia"
    },
    {
      "id_question": "CuvGmuJsle",
      "answer": "-Y / Z"
    },
    {
      "id_question": "eC7sUcWJzL",
      "answer": "X=2, Y=1/3, Z=2"
    },
    {
      "id_question": "ZvoW1yai4l",
      "answer": "O resultado é zero"
    }
  ]
}

## Response:
{
  "score": 100.0
}