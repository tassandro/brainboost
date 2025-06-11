import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AppScreen from '@comp/AppScreen';
import FloatingMenu from '@comp/menu';
import UrlForm from '@comp/urlForm';
import Wating from '@comp/waiting';
import API from '@sv/api';

import BrainLogo from '@img/BrainLogo.svg';

type VideoData = {
  id_video: string;
  link_video: string;
  resumo_video: string;
  score: number;
};

export default function Profile() {
  const [history, setHistory] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const res = await API.get<VideoData[]>('/profile');
          setHistory(res.data);
        } catch (err: any) {
          if (err.response?.status === 404) {
            setHistory([]);
          } else if (__DEV__) {
            console.warn('Erro ao buscar histórico:', err?.response?.data ?? err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      const timer = setTimeout(() => {
        fetchHistory();
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <AppScreen backgroundColor="#f9f9f9">
      <FloatingMenu position={{ top: 20, left: 20 }} />
      <Wating isLoading={isLoading || loading} />

      <View style={styles.container}>
        <View style={{ marginBottom: -20, alignSelf: 'center' }}>
          <BrainLogo width={130} height={130} />
        </View>
        <UrlForm setIsLoading={setIsLoading} />
        <Text style={styles.title}>Histórico de Vídeos</Text>

        <FlatList
          data={history}
          keyExtractor={(item) => item.id_video}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isExpanded = expandedItems.includes(item.id_video);
            return (
              <TouchableOpacity
                onPress={() => toggleExpand(item.id_video)}
                style={styles.card}
                activeOpacity={0.9}
              >
                <Text style={styles.link}>
                  {item.link_video} {isExpanded ? '▲' : '▼'}
                </Text>

                {isExpanded && (
                  <>
                    <Text style={styles.subtitle}>Resumo</Text>
                    <Text style={styles.description}>{item.resumo_video}</Text>
                    <Text style={styles.score}>Score: {item.score}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>Nenhum vídeo disponível</Text>
            ) : null
          }
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
    top: '10%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007acc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  score: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
