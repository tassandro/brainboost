import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Waiting from '@/components/Waiting/waiting';
import Header from '@/components/Header/header';
import UrlForm from '@/components/UrlForm/urlForm';

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
    score: number;
    questions?: Question[];
};

export default function Profile() {
    const [history, setHistory] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState(true); //carregamento inicial
    const [isLoading, setIsLoading] = useState(false);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get<VideoData[]>('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setHistory(res.data);
            } catch (err) {
                console.error('Erro ao buscar histórico:', err);
                // logout();
                // navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [token, logout, navigate]);

    if (loading) {
        return <Waiting isLoading={loading} />
    }

    // if (history.length === 0) {
    //     return <div className="text-center py-10">Nenhum vídeo encontrado.</div>;
    // }

    return (
        <div className="px-4 py-10 flex-[1_1_60%]">
            <Header navBar={isLoading}></Header>
            <div className='pt-[85px]'>
                <div className='max-w-[700px] object-center mx-auto'>
                    <UrlForm setIsLoading={setIsLoading} />

                </div>
                <button onClick={() => navigate('/edit')} className='btn w-[100px] items-center mx-auto justify-center flex my-5'>Edit Profile</button>
                <h1 className="text-3xl font-bold mb-6 mt-6 text-center">Histórico de Vídeos</h1>
                <ul className="space-y-6">
                    {history.map((video) => (
                        <li key={video.id_video} className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-sm text-gray-500 mb-2 break-words">{video.link_video}</p>
                            <h2 className="text-xl font-semibold mb-2">Resumo</h2>
                            <p className="mb-4">{video.resumo_video}</p>
                            <p className="text-green-700 font-medium">Score: {video.score}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}