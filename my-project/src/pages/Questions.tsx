import { Link } from 'react-router-dom';
import styles from '../styles/Questions.module.css';

import BrainIco from '../images/ico/BrainIco.png';

export default function Questions() {
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
        <Link to="/" className={styles.loginBtn}>LOGIN</Link>
      </header>

      {/* Conteúdo principal */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.pergunta}>
            <p>Como a imaginação do admirador contribui para sua admiração pelo artista?</p>
          </div>

          <div className={styles.respostas}>
            <button className={styles.rButton}>
              A. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, natus aliquid. Adipisci labore distinctio consequatur ducimus praesentium laborum, repellat odit veniam culpa repellendus accusamus modi quos aliquam excepturi ipsam! Tenetur!
            </button>
            <button className={styles.rButton}>B.</button>
            <button className={styles.rButton}>C.</button>
            <button className={styles.rButton}>D.</button>
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
