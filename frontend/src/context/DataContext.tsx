import { createContext, useState, useContext, ReactNode } from 'react';

type Question = {
  id_question: string;
  texto_questao: string;
  pontuacao: number;
  alternatives: string[];
  correct_answer: string;
};

export type VideoData = {
  id_video: string;
  link_video: string;
  resumo_video: string;
  questions: Question[];
};

type VideoContextType = {
  videoData: VideoData | null;
  setVideoData: (data: VideoData) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  return (
    <VideoContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useData() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um VideoProvider');
  }
  return context;
}