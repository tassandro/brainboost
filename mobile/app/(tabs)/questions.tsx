import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AppScreen from '@comp/AppScreen';
import { useAuth } from '@cont/AuthContext';
import { useData } from '@cont/DataContext';
import API from '@sv/api';
import { useRouter } from 'expo-router';

export default function Questions() {
  const { token, user } = useAuth();
  const { videoData } = useData();
  const router = useRouter();

  const IS_SIMULATING = videoData?.id_video === 'fake_video_id';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!videoData) {
      router.replace('/profile');
    }
  }, [videoData, router]);

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
      id_video: String(videoData.id_video),
      answers: videoData.questions.map((q) => ({
        id_question: String(q.id_question),
        answer: q.userAnswer ?? '',
      })),
    };

    try {
      const response = await API.post('/submit_answers/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Respostas enviadas:', response.data);
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
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

  if (!videoData) {
    return (
      <AppScreen>
        <Text style={styles.loadingText}>Carregando...</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen backgroundColor='#f9f9f9'>
      <View style={styles.container}>
        {finished ? (
          <>
            <Text style={styles.title}>Quiz finalizado!</Text>
            <Text style={styles.score}>Pontuação: {score} / {videoData.questions.length}</Text>
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>Reiniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Pergunta {currentIndex + 1}</Text>
            <Text style={styles.question}>{currentQuestion?.texto_questao}</Text>

            <FlatList
              data={currentQuestion?.alternatives}
              keyExtractor={(item, idx) => `${idx}`}
              renderItem={({ item, index }) => {
                const isCorrect = item === currentQuestion?.correct_answer;
                const isSelected = item === selectedAnswer;

                let btnStyle = [styles.answerButton];
                if (selectedAnswer) {
                  btnStyle.push(
                    isCorrect
                      ? { ...styles.answerButton, ...styles.correct }
                      : isSelected
                      ? { ...styles.answerButton, ...styles.incorrect }
                      : styles.answerButton
                  );
                }

                return (
                  <TouchableOpacity
                    style={btnStyle}
                    onPress={() => !selectedAnswer && handleSelect(item)}
                    disabled={!!selectedAnswer}
                  >
                    <Text style={styles.answerText}>
                      {String.fromCharCode(65 + index)}. {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              style={{ marginTop: 16 }}
            />

            {selectedAnswer && (
              <Text style={styles.feedback}>
                {selectedAnswer === currentQuestion?.correct_answer
                  ? '✅ Resposta correta!'
                  : `❌ Resposta incorreta. Correta: ${currentQuestion?.correct_answer}`}
              </Text>
            )}

            <View style={styles.navigation}>
              <TouchableOpacity style={styles.button} onPress={handleBack} disabled={currentIndex === 0}>
                <Text style={styles.buttonText}>⬅ Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNext} disabled={!selectedAnswer}>
                <Text style={styles.buttonText}>
                  {currentIndex === videoData.questions.length - 1 ? 'Finalizar' : 'Próxima ➡'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  answerButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 12,
  },
  answerText: {
    fontSize: 16,
  },
  correct: {
    backgroundColor: '#d4edda',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  incorrect: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    backgroundColor: '#537459e5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});
