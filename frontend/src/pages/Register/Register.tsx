import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { registerUser } from '@/services/authService';
import { ReactComponent as ArrowIcon } from '@/assets/images/ico/arrowBack.svg';
import { ReactComponent as BrainLogo } from '@/assets/images/ico/BrainLogo.svg'

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const res = await registerUser(fullName, username, password);
            login(res.data.access_token);
            navigate('/');
        } catch (err: any) {
            console.error('Erro no registro:', err);
            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Erro ao registrar. Tente novamente.');
            }
        }
    };

    const goBack = () => {
        window.history.back();
    };

    return (

        <div className="flex-col min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
            <BrainLogo className='w-[130px] h-[130px]'/>
            <div className="w-full max-w-[650px] h-[500px] bg-white rounded-3xl shadow-xl p-8 relative">
                {/* Ícone de voltar */}
                <button onClick={goBack} className="absolute top-4 left-4 text-2xl text-gray-500 hover:text-gray-700">
                    <ArrowIcon className="w-11 h-11 text-gray-500 hover:text-gray-400" />
                </button>

                {/* Título e descrição */}
                <div className="mb-8 pt-10 text-center">
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <p className="text-gray-500 mt-1">Login details</p>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <form className="space-y-6 text-center" onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-12 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#a2aea3]"
                    />
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
                        className="w-[100px] h-12 bg-[#537459e5] text-white font-semibold rounded-full shadow-md hover:bg-[#537459] hover:ring-2 hover:ring-[#537459]"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>

    );
}
