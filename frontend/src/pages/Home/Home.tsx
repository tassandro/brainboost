//estilo de formatação
import '@/pages/Home/Home.css';

//dependências
import { useEffect } from 'react';
import { useState } from 'react';

//componentes
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';
import Waiting from '@/components/Waiting/waiting';
import SectionA from '@/components/Sections/sectionA';
import SectionB from '@/components/Sections/sectionB';
import SectionC from '@/components/Sections/sectionC';
import revealElements from '@/utils/scrollReview';

export default function Home() {

  // Definição dos estados
  const [isLoading, setIsLoading] = useState(false); //página de espera

  // Efeito de animação de scroll
  useEffect(() => {
    // revealElements({ selector: '.header' });
    revealElements({ selector: '.hero-image', origin: 'left' });
    revealElements({ selector: '.hero-content', origin: 'right' });
  }, []);

  return (
    <div id="home">
      <Waiting isLoading={isLoading} />
      <Header navBar={true}/>
      <SectionA setIsLoading={setIsLoading} />
      <SectionB />
      <div id="about">
        <SectionC />
      </div>
      <Footer />
    </div>
  );
}
