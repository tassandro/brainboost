import { Link, useNavigate } from 'react-router-dom';
import BrainIco from '@/assets/images/ico/BrainIco.png';
import { useAuth } from '@/context/AuthContext';

type HeaderProps = {
  navBar: boolean;
};

export default function Header({ navBar }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollHome = () => {
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    else {
      navigate('/');
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
              <li><Link to="/" onClick={() => scrollHome()} >Home</Link></li>
              <li><Link to="/" onClick={() => scrollAbout()}>About</Link></li>
              <li><Link to="/">Contact</Link></li>
              {/* <li><Link to="/questions">Question</Link></li> */}
              {
                isAuthenticated &&
                <li><Link to="/profile">Profile</Link></li>
              }
            </ul>
          </nav>
        }

        <nav className="space-x-4">
        {!isAuthenticated &&
          <button onClick={() => navigate('/register')} className='text-gray-600'>Sign Up</button>
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