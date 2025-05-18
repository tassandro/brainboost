import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@cont/AuthContext';
import { useData } from '../contexts/DataContext';
import { submitVideo } from '@sv/videoService';
import { Ionicons } from '@expo/vector-icons';


type UrlFormProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UrlForm({ setIsLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const { isAuthenticated } = useAuth();
  const { setVideoData } = useData();
  const navigation = useNavigation();

  const onSubmit = async () => {
    if (!isAuthenticated) {
      navigation.navigate('Plans' as never);
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitVideo(url);
      setVideoData(result);
      setIsLoading(false);
      navigation.navigate('Questions' as never);
    } catch (err: any) {
      console.error('Erro ao processar vídeo:', err);
      Alert.alert('Erro', 'Erro ao processar o vídeo. Verifique o link e tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>

        <TextInput
          placeholder="Enter a valid YouTube URL"
          value={url}
          onChangeText={setUrl}
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TouchableOpacity style={styles.fab} onPress={() => onSubmit()}>
          <Ionicons name="search" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    height: 45,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    color: '#333',
    width: '83%',
  },
  fab: {
    backgroundColor: '#537459',
    borderRadius: 32,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginVertical: 16,
    width: '100%',
    paddingHorizontal: 16,
    
  }
});
