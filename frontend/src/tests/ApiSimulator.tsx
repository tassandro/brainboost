import React from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function Simulate() {
  const { setVideoData } = useData();
  const navigate = useNavigate();

  const handleSimulate = () => {
    const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos velit illo esse, doloribus dolorem eos eligendi consequuntur alias iusto, dolorum ipsam, sit laudantium tempora ipsum ad. Rem quam voluptates dolorem?"
    const simulatedData = {
      id_video: "fake_video_id",
      link_video: "https://youtu.be/dQw4w9WgXcQ",
      resumo_video: `Este é um resumo de teste sobre o vídeo simulado.\n${text.repeat(10)}`,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id_question: `q${i + 1}`,
        texto_questao: `Qual é a resposta da questão ${i + 1}?`,
        pontuacao: 10,
        alternatives: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
        correct_answer: 'Alternativa A',
        userAnswer: 'Alternativa B', // simula uma resposta errada propositalmente
      })),
    };

    setVideoData(simulatedData);
    console.log("Dados simulados aplicados ao contexto!");
    navigate('/questions');
  };

  return (
    <div className="p-4 border rounded bg-gray-100 shadow flex-column text-center mx-auto w-[30%]">
      <h2 className="text-lg font-bold mb-2">Simulador de API</h2>
      <button
        onClick={handleSimulate}
        className="btn w-[300px]"
      >
        Simular Resposta Completa
      </button>
    </div>
  );
}
