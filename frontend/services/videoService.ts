import API from '../api';

type Question = {
  id_question: string;
  texto_questao: string;
  pontuacao: number;
  alternatives: string[];
  correct_answer: string;
};

export type VideoResponse = {
  id_video: string;
  link_video: string;
  resumo_video: string;
  questions: Question[];
};

export const submitVideo = async (link_video: string): Promise<VideoResponse> => {
  const response = await API.post<VideoResponse>('/video', { link_video });
  return response.data;
};