import styles from '@/pages/Plans/Plans.module.css';
import PlanImage1 from '@/assets/images/plans/plan1.jpeg';
import PlanImage2 from '@/assets/images/plans/plan2.jpeg';
import PlanImage3 from '@/assets/images/plans/plan3.jpeg';
import checkIco from '@/assets/images/ico/CheckIco3.svg';
import backPicture2 from '@/assets/images/backNeural.svg';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header/header';

export default function Plans() {
    // const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen relative bg-[#f6f7f8] overflow-hidden">
            <img className='absolute opacity-10' src={backPicture2} alt="neural-background"></img>
            <Header navBar={false} />

            <main className={styles.mainContent}>
                <h2 className='py-8 font-sans text-lg text-gray-600 bg-[#f6f7f8]'>Escolha o Plano que Melhora seu Desempenho</h2>

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
                            <button onClick={() => navigate('/register')} className="self-center mb-5 w-[140px] h-10 bg-[#537459e5] text-white font-semibold rounded-md shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-secondary">Assine Grátis</button>
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
                            <button className="self-center mb-5 w-[140px] h-10 bg-[#537459e5] text-white font-semibold rounded-md shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-secondary">Assinar Premium</button>
                    </div>

                    <div className={styles.planCard}>
                        <img src={PlanImage3} alt="Login" className={styles.planImage} />
                        <div className="text-center">
                            <h3>Já possui uma conta?</h3>
                            <p>Acesse seus resumos e questões interativas agora.</p>
                        </div>
                            <button onClick={() => navigate('/login')} className="self-center mb-5 w-[140px] h-10 bg-[#537459e5] text-white font-semibold rounded-md shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-secondary">Começar agora</button>
                    </div>
                </div>
            </main>
        </div>
    );
}