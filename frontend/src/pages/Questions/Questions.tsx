//https://www.youtube.com/watch?v=WUH6V3hXWp8
import { useEffect, useState } from 'react';
import styles from '@/pages/Questions/Questions.module.css';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Header from '@/components/Header/header';

export default function Questions() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { videoData } = useData();
  const IS_SIMULATING = videoData?.id_video === "fake_video_id";

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // Necessário para exibir o aviso no Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!videoData) {
      navigate('/');
    }
  }, [videoData, navigate]);

  const currentQuestion = videoData?.questions[currentIndex];

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);

    if (videoData) {
      videoData.questions[currentIndex].userAnswer = answer;
    }

    if (answer === currentQuestion?.correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const submitAnswers = async () => {
    if (!videoData || !user || !token) return;

    const payload = {
      id_user: user.id,
      id_video: videoData.id_video,
      answers: videoData.questions.map((q) => ({
        id_question: q.id_question,
        answer: q.userAnswer || '',
      })),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit_answers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar respostas');
      }

      const data = await response.json();
      console.log('Pontuação salva com sucesso:', data);
    } catch (error) {
      console.error('Erro no envio das respostas:', error);
    }
  };

  const handleNext = async () => {
    if (!videoData) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= videoData.questions.length) {
      if (!IS_SIMULATING) {
        await submitAnswers();
      }
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  if (!videoData) return <div className={styles.pageWrapper}>Carregando...</div>;

  return (
    <div>
      <Header navBar={false} />

      <main className="grid grid-cols-2 mx-auto bg-primary h-screen">
        <div className='flex pt-[85px] h-full w-full justify-center items-center'>
          <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg object-center my-auto mx-auto">
            {finished ? (
              <> 
                <h2>Quiz finalizado!</h2>
                <p className={styles.score}>Sua pontuação: {score} / {videoData.questions.length}</p>
                <button className={styles.navButton} onClick={handleRestart}>Reiniciar</button>
                <button className={styles.navButton} onClick={() => navigate('/')}>Voltar para Home</button>
              </>
            ) : (
              <>
                <div className={styles.pergunta}>
                  <p><strong>{currentIndex + 1}.</strong> {currentQuestion?.texto_questao}</p>
                </div>

                <div className={styles.respostas}>
                  {currentQuestion?.alternatives.map((alt, idx) => {
                    const isCorrect = alt === currentQuestion?.correct_answer;
                    const isSelected = alt === selectedAnswer;

                    let className = styles.rButton;
                    if (selectedAnswer) {
                      className += ' ' + (isCorrect ? styles.correct : isSelected ? styles.incorrect : '');
                    }

                    return (
                      <button
                        key={idx}
                        className={className}
                        onClick={() => !selectedAnswer && handleSelect(alt)}
                        disabled={!!selectedAnswer}
                      >
                        {String.fromCharCode(65 + idx)}. {alt}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className={styles.feedback}>
                    {selectedAnswer === currentQuestion?.correct_answer
                      ? '✅ Resposta correta!'
                      : `❌ Resposta incorreta. Correta: ${currentQuestion?.correct_answer}`}
                  </div>
                )}

                <div className={styles.navegacao}>
                  <button className={styles.navButton} onClick={handleBack} disabled={currentIndex === 0}>
                    ⬅ Voltar
                  </button>
                  <button
                    className={styles.navButton}
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                  >
                    {currentIndex === videoData.questions.length - 1 ? 'Finalizar' : 'Próxima ➡'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='bg-black pt-[85px] h-screen'>
          <div className='bg-white overflow-y-auto h-full py-6 px-12 text-justify font-sans'>
            {videoData.resumo_video}
          </div>
        </div>
      </main>
    </div>
  );
}
