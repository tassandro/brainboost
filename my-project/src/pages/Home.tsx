import BrainIco from '../images/ico/BrainIco.png';
import img1 from '../images/img1.jpeg';
import bgGreen from '../images/Background-green.jpg';
import CheckIco from '../images/ico/CheckIco.svg';
import BookIco from '../images/ico/BookIco.png';
import BookPcIco from '../images/ico/BookPcIco.png';
import PcIco from '../images/ico/PcIco.png';

import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';
import waitUp from '../animations/waitup.gif';

import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

import UrlForm from './components/urlForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    ScrollReveal().reveal('.header', {
      duration: 2000,
    });

    ScrollReveal().reveal('.hero-image', {
      origin: 'left',
      duration: 2000,
      distance: '10%',
    });

    ScrollReveal().reveal('.hero-content', {
      origin: 'right',
      duration: 2000,
      distance: '10%',
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('isLoading mudou para:', isLoading);
  }, [isLoading]);

  const navigate = useNavigate();

  //função assíncrona que submete a url como requisição post e quando ela retorna true, navega para a página de questões
  async function onSubmit(url: string) {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate a delay
      setIsLoading(false);
      navigate('/questions');
    }, 10000);  
  }

  return (
    <div>
      {isLoading && (
        <div className='waiting'>
          <img src={waitUp} alt="Carregando..." style={{ width: 100, height: 100 }} />
        </div>
      )}
      <header className="header">
        <div className="header-container">
          <h3 className="logo">
            <img
              className="header-icon"
              src={BrainIco}
              alt="Icone"
              width={64}
              height={64}
            />
            <a href="/">Brainboost</a>
          </h3>

          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/questions">Question</Link></li>

            </ul>
          </nav>

          {/* <a href="login.html" className="btn login-btn">Login</a> */}
          <Link to="/login" className="btn login-btn">Login</Link>
        </div>
      </header>

      <section className="hero-section" style={{ backgroundImage: `url(${bgGreen}')` }}>
        <div className="hero-grid">
          <div
            className="hero-image"
            style={{ backgroundImage: `url(${img1})` }}
          ></div>

          <div className="hero-content">
            <h5>O que nós fazemos</h5>
            <h1>Resumos concisos de vídeo aulas do YouTube e questões interativas.</h1>
            <p>              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>

            <ul className="hero-list">
              <li><img src={CheckIco} alt="" />Aprendizado</li>
              <li><img src={CheckIco} alt="" />Conhecimento</li>
              <li><img src={CheckIco} alt="" />Resumos</li>
              <li><img src={CheckIco} alt="" />Exercícios</li>
            </ul>

            {/* <form action="#" method="POST" className="search-form">
              <input
                type="url"
                name="videoURL"
                placeholder="Enter a valid YouTube URL"
                required
              />
              <button type="submit" onClick={handleSubmit}>Pesquisar</button>
            </form> */}
            <UrlForm onSubmit={onSubmit} />
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          <h2>Transforme sua experiência de aprendizado e alcance novos patamares</h2>

          <div className="services-list">
            <div
              className="service-card"
              style={{ backgroundImage: `url(${img2})` }}
            >
              <img src={BookIco} alt="" className="card-icon" />
              <h4>Resumos</h4>
              <p>Sample text. Click again or double click to start editing the text.</p>
            </div>

            <div
              className="service-card"
              style={{ backgroundImage: `url(${img3})` }}
            >
              <img src={BookPcIco} alt="" className="card-icon" />
              <h4>Estratégia</h4>
              <p>Sample text. Click again or double click to start editing the text.</p>
            </div>

            <div
              className="service-card"
              style={{ backgroundImage: `url(${img4})` }}
            >
              <img src={BookIco} alt="" className="card-icon" />
              <h4>Missão</h4>
              <p>Sample text. Click again or double click to start editing the text.</p>
            </div>

            <div
              className="service-card"
              style={{ backgroundImage: `url(${img5})` }}
            >
              <img src={PcIco} alt="" className="card-icon" />
              <h4>Aprendizado</h4>
              <p>Sample text. Click again or double click to start editing the text.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="strategy-section">
        <div className="strategy-container">
          <div className="strategy-text">
            <h2>Estratégias e Soluções</h2>
            <ul className="strategy-list">
              <li>
                <h3>01. Resumos automáticos de videoaulas do YouTube</h3>
                <p>Utilizamos algoritmos de processamento de linguagem natural (NLP) para transformar videoaulas longas em resumos objetivos e organizados, economizando tempo e facilitando a revisão. O estudante pode colar o link de um vídeo e obter rapidamente uma síntese dos principais tópicos abordados.</p>
              </li>
              <li>
                <h3>02. Criação de questões personalizadas para revisão</h3>
                <p>Com base no conteúdo dos vídeos, nosso sistema gera automaticamente questões de múltipla escolha para reforçar o aprendizado. Isso ajuda na fixação do conteúdo, testando a compreensão do estudante de forma ativa e personalizada.</p>
              </li>
              <li>
                <h3>03. Ferramenta voltada para estudantes</h3>
                <p>Nossa plataforma é pensada especialmente para estudantes que buscam eficiência nos estudos. Seja no ensino médio, graduação ou concursos, o Brainboost oferece uma experiência intuitiva, leve e produtiva, centralizando aprendizado, revisão e prática em um só lugar.</p>
              </li>
            </ul>
          </div>
          <div
            className="strategy-image"
            style={{ backgroundImage: `url(${img4})` }}
          ></div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 BrainBoost - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
