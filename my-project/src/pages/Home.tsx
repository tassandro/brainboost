import BrainIco from '../images/ico/BrainIco.png';
import img1 from '../images/img1.jpeg';
import bgGreen from '../images/Background-green.jpg';
import CheckIco from '../images/ico/CheckIco2.svg';
import BookIco from '../images/ico/BookIco.png';
import BookPcIco from '../images/ico/BookPcIco.png';
import PcIco from '../images/ico/PcIco.png';

import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';

import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

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

  return (
    <div>
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
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>

            <ul className="hero-list">
              <li><img src={CheckIco} alt="" />Aprendizado</li>
              <li><img src={CheckIco} alt="" />Conhecimento</li>
              <li><img src={CheckIco} alt="" />Resumos</li>
              <li><img src={CheckIco} alt="" />Exercícios</li>
            </ul>

            <form action="#" method="POST" className="search-form">
              <input
                type="url"
                name="videoURL"
                placeholder="Enter a valid YouTube URL"
                required
              />
              <button type="submit">Pesquisar</button>
            </form>
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
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </li>
              <li>
                <h3>02. Criação de questões personalizadas para revisão</h3>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </li>
              <li>
                <h3>03. Ferramenta voltada para estudantes</h3>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
