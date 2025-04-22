import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import { ReactComponent as ArrowIcon } from '@/assets/images/ico/arrowBack.svg';
import { ReactComponent as BrainLogo } from '@/assets/images/ico/BrainLogo.svg';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const res = await loginUser(username, password);
            login(res.data.access_token);
            navigate('/');
        } catch (err: any) {
            if (err.response?.status === 400) {
                setError('Credenciais inválidas');
            } else {
                setError('Erro ao fazer login. Tente novamente.');
            }
        }
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex-col min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
            <BrainLogo className="w-[130px] h-[130px]" />
            <div className="w-full max-w-[650px] h-[500px] bg-white rounded-3xl shadow-xl p-8 relative">
                {/* Ícone de voltar */}
                <button onClick={goBack} className="absolute top-4 left-4 text-2xl text-gray-500 hover:text-gray-700">
                    <ArrowIcon className="w-11 h-11 text-gray-500 hover:text-gray-400" />
                </button>

                <div className="mb-8 pt-10 text-center">
                    <h2 className="text-2xl font-bold">Sign In</h2>
                    <p className="text-gray-500 mt-1">Your credencials</p>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form className="space-y-6 text-center" onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-12 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#a2aea3]"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#a2aea3]"
                    />

                    <button
                        type="submit"
                        className="w-full h-12 bg-[#537459e5] text-white font-semibold rounded-full shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-[#537459]"
                    >
                        Sign In
                    </button>

                    <Link to="/" className='text-[13px] font-bold text-gray-800 hover:text-gray-700 hover:underline py-2'> Forgot your password?</Link>
                </form>
            </div>
        </div>
    );
}

