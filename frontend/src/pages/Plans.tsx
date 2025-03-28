import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import styles from '../styles/Plans.module.css';
import BrainIco from '../images/ico/BrainIco.png';
import PlanImage1 from '../images/plans/plan1.jpeg';
import PlanImage2 from '../images/plans/plan2.jpeg';
import PlanImage3 from '../images/plans/plan3.jpeg';
import checkIco from '../images/ico/CheckIco3.svg';

export default function Plans() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.header}>
                <div className={styles.logoArea}>
                    <img src={BrainIco} alt="Ícone Brainboost" className={styles.headerIcon} />
                    <h1 className={styles.logo}><a href="/">Brainboost</a></h1>
                </div>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className={styles.loginBtn}>Logout</button>
                ) : (
                    <Link to="/login" className={styles.loginBtn}>Login</Link>
                )}
            </header>

            <main className={styles.mainContent}>
                <h2>Escolha o Plano que Melhora seu Desempenho</h2>

                <div className={styles.planContainer}>
                    <div className={styles.planCard}>
                        <img src={PlanImage1} alt="Plano Básico" className={styles.planImage} />
                        <div>
                            <h3>Plano Básico | Gratuito</h3>
                            <p className={styles.price}>$0</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />Acesso limitado</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />Resumos de vídeos até 5 min</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />10 questões por vídeo</p>
                        </div>
                            <button onClick={() => navigate('/register')} className={styles.planButton}>Assine Grátis</button>
                    </div>

                    <div className={`${styles.planCard} ${styles.recommended}`}>
                        <img src={PlanImage2} alt="Plano Premium" className={styles.planImage} />
                        <div>
                            <h3>Plano Premium | Completo</h3>
                            <p className={styles.price}>$29</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />Resumos ilimitados</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />Geração Flashcards</p>
                            <p><img className={styles.icon} src={checkIco} alt="" />30 Questões por vídeo</p>
                        </div>
                            <button className={styles.planButton}>Assinar Premium</button>
                    </div>

                    <div className={styles.planCard}>
                        <img src={PlanImage3} alt="Login" className={styles.planImage} />
                        <div>
                            <h3>Já possui uma conta?</h3>
                            <p>Acesse seus resumos e questões interativas agora.</p>
                        </div>
                            <button onClick={() => navigate('/login')} className={styles.planButton}>Começar agora</button>
                    </div>
                </div>
            </main>
        </div>
    );
}