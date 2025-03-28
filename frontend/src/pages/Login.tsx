import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { loginUser } from '../Services/authService';
import styles from '../styles/Login.module.css';

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
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>Sign In</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <button className={styles.backBtn} type="button" onClick={goBack}>
                        Cancel
                    </button>
                    {error && <div className={styles.error}>{error}</div>}
                    <input
                        required
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        required
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className={styles.loginButton} type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    );
}
