import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { submitVideo } from '@/services/videoService';

type UrlFormProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UrlForm({ setIsLoading }: UrlFormProps) {

    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(url);
    }

    const navigate = useNavigate(); //permite navegação de página
    const { isAuthenticated } = useAuth(); //logout removido(adicionar se necessário)
    const { setVideoData } = useData();

    async function onSubmit(url: string) {
        // Verifica se o usuário está logado
        if (!isAuthenticated) {
            navigate('/plans');
            return;
        }

        setIsLoading(true); //abre página de espera

        try {
            const result = await submitVideo(url);
            // Armazenando no localStorage(mudar para backend depois)
            // localStorage.setItem('video_data', JSON.stringify(result));

            setVideoData(result);

            setIsLoading(false); //fecha página de espera
            navigate('/questions'); //encaminha para questions
        } catch (err: any) {
            console.error('Erro ao processar vídeo:', err);
            alert('Erro ao processar o vídeo. Verifique o link e tente novamente.');
            setIsLoading(false);
        }
    }

    return (
        <form
            action="#"
            method="POST"
            className="flex max-w-[100%] gap-2 items-center"
            onSubmit={handleSubmit}>
            <input
                type="url"
                name="videoURL"
                value={url}
                placeholder="Enter a valid YouTube URL"
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 h-[45px] px-3 rounded-xl border border-gray-300 text-gray-800 shadow-sm outline-none transition duration-300 focus:border-gray-500 focus:shadow-md"
            />
            <button
                type="submit"
                className="h-[45px] px-4 bg-[#325239] text-white rounded-lg font-semibold transition duration-200 hover:shadow-md active:scale-[0.98]"
            >Pesquisar</button>
        </form>
    )
}