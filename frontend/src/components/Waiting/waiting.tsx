import '@/pages/Home/Home.css';
import waitUp from '@/assets/animations/waitup.gif';

type WaitingProps = {
    isLoading: boolean;
    };

export default function Waiting({isLoading}:WaitingProps) {
    return (
        <div>
            {isLoading && (
                <div className='waiting'>
                  <img src={waitUp} alt="Carregando..." style={{ width: 100, height: 100 }} />
                </div>
              )}
        </div>
    );
}