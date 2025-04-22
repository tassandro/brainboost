//https://www.youtube.com/watch?v=WUH6V3hXWp8
import { useEffect, useState } from 'react';
import styles from '@/pages/Questions/Questions.module.css';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BrainIco from '@/images/ico/BrainIco.png';

type Question = {
  id_question: string;
  texto_questao: string;
  pontuacao: number;
  alternatives: string[];
  correct_answer: string;
};

type VideoData = {
  id_video: string;
  link_video: string;
  resumo_video: string;
  questions: Question[];
};

export default function Questions() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('video_data');
    if (saved) {
      setVideoData(JSON.parse(saved));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentQuestion = videoData?.questions[currentIndex];

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);

    if (answer === currentQuestion?.correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!videoData) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= videoData.questions.length) {
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
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img src={BrainIco} alt="Ícone Brainboost" className={styles.headerIcon} />
          <h1 className={styles.logo}><a href="/">Brainboost</a></h1>
        </div>
        {isAuthenticated && <button onClick={handleLogout} className={styles.loginBtn}>Logout</button>}
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
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
      </main>
    </div>
  );
}