import img1 from '@/assets/images/img1.jpeg';
import bgGreen from '@/assets/images/Background-green.jpg';
import CheckIco from '@/assets/images/ico/CheckIco.svg';
import UrlForm from '@/components/UrlForm/urlForm';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { submitVideo } from '@/services/videoService';

import '@/pages/Home/Home.css';
import { content } from '@/content/sectionA';

//determina o tipo de props necessário pelo typeScript
type SectionAProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function SectionA({ setIsLoading }: SectionAProps) {

  const navigate = useNavigate(); //permite navegação de página
  const { isAuthenticated } = useAuth(); //logout removido(adicionar se necessário)

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
      localStorage.setItem('video_data', JSON.stringify(result));

      setIsLoading(false); //fecha página de espera
      navigate('/questions'); //encaminha para questions
    } catch (err: any) {
      console.error('Erro ao processar vídeo:', err);
      alert('Erro ao processar o vídeo. Verifique o link e tente novamente.');
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-[#537459] bg-cover bg-center h-screen text-white pt-[120px] pd-8" style={{ backgroundImage: `url(${bgGreen}')` }}>
      <div className="flex flex-wrap max-w-[1200px] min-h-[600px] mx-auto">
        <div
          className="flex-[1_1_40%] bg-cover bg-center rounded-[5%] h-[545px] hero-image"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>

        <div className="flex-[1_1_60%] text-white p-8 hero-content">
          <h5 className="mb-4 font-normal text-white p-2">{content.subtitle}</h5>
          <h1 className="mb-4 font-bold text-5xl p-2">{content.title}</h1>
          <p className="mb-6 leading-relaxed p-2">{content.description}</p>

          <ul className="grid grid-cols-2 gap-4 list-none mb-6 p-2">
            <li className="flex items-center"><img src={CheckIco} alt="" className="w-6 h-6 mr-2" />{content.highlights[0]}</li>
            <li className="flex items-center"><img src={CheckIco} alt="" className="w-6 h-6 mr-2" />{content.highlights[1]}</li>
            <li className="flex items-center"><img src={CheckIco} alt="" className="w-6 h-6 mr-2" />{content.highlights[2]}</li>
            <li className="flex items-center"><img src={CheckIco} alt="" className="w-6 h-6 mr-2" />{content.highlights[3]}</li>
          </ul>

          <UrlForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}