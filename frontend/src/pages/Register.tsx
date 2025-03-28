import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { registerUser } from '../Services/authService';
import styles from '../styles/Login.module.css';

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
            console.log('Registrando com:', fullName, username, password);
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
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>Register</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <button className={styles.backBtn} type="button" onClick={goBack}>
                        Cancel
                    </button>
                    {error && <div className={styles.error}>{error}</div>}
                    <input
                        required
                        className={styles.input}
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
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
                    <input className={styles.loginButton} type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}
