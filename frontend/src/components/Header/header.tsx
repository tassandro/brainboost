import { Link, useNavigate } from 'react-router-dom';
import BrainIco from '@/assets/images/ico/BrainIco.png';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '@/assets/images/ico/arrowBack.svg';


type HeaderProps = {
  navBar: boolean;
};

export default function Header({ navBar }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    console.log('Logout realizado com sucesso!');
    navigate('/home');
  };

  const scrollHome = () => {
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.pathname !== '/home') {
      navigate('/home');
    }
  }

  const scrollAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85; // ajusta para compensar o cabeçalho fixo
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <h3 className=" logo">
          <button onClick={() => scrollHome()} className='flex w-[300px] '>
            <img className="header-icon" src={BrainIco} alt="Icone" width={64} height={64} />
            <p className='py-2 pl-3 font-bold'>Brainboost</p>
          </button>
        </h3>

        {navBar &&
          <nav className="w-1/3 justify-center space-x-2 navbar items-center">
            <ul>
              <li><Link to="/home" onClick={() => scrollHome()} >Home</Link></li>
              <li><Link to="/home" onClick={() => scrollAbout()}>About</Link></li>
              <li><Link to="/home">Contact</Link></li>
              {
                isAuthenticated &&
                <li><Link to="/profile">Profile</Link></li>
              }
            </ul>
          </nav>
        }

        <nav className="flex space-x-4">
          {location.pathname === '/questions' &&
            <button onClick={() => navigate('/profile')} className='text-gray-300 flex items-center justify-center h-12 w-12 hover:rounded-full hover:bg-gray-100 hover:text-gray-500'>
              <ArrowIcon/>
            </button>
          }
          {!isAuthenticated &&
            <button onClick={() => navigate('/register')} className='text-gray-600 hover:text-gray-700'>Sign Up</button>
          }
          {!isAuthenticated ?
            <button onClick={() => navigate('/login')} className="w-[100px] h-12 bg-[#537459e5] text-white font-semibold rounded-full shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-secondary">Login</button> :
            <button onClick={handleLogout} className="w-[100px] h-12 bg-[#537459e5] text-white font-semibold rounded-full shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-secondary">Logout</button>
          }
        </nav>

      </div>
    </header>
  );
}