import styles from '../styles/Questions.module.css';
import { useAuth } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';

import BrainIco from '../images/ico/BrainIco.png';

export default function Questions() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img
            src={BrainIco}
            alt="Ícone Brainboost"
            className={styles.headerIcon}
          />
          <h1 className={styles.logo}>
            <a href="/">Brainboost</a>
          </h1>
        </div>
        {isAuthenticated && <button onClick={handleLogout} className={styles.loginBtn}>Logout</button> }
        
      </header>

      {/* Conteúdo principal */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.pergunta}>
            <p>O que a função len() faz em Python?</p>
          </div>

          <div className={styles.respostas}>
            <button className={styles.rButton}>A. Retorna o maior número de uma lista</button>
            <button className={styles.rButton}>B. Conta o número de elementos em um objeto iterável</button>
            <button className={styles.rButton}>C. Cria uma nova lista a partir de outra</button>
            <button className={styles.rButton}>D. Verifica se todos os elementos são inteiros</button>
          </div>

          <div className={styles.navegacao}>
            <button className={styles.navButton}>⬅ back</button>
            <button className={styles.navButton}>next ➡</button>
          </div>
        </div>
      </main>
    </div>
  );
}
