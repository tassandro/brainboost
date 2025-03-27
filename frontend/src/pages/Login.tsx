import { FormEvent } from 'react';
import styles from '../styles/Login.module.css';
import { useAuth } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setUserName(formData.get('username') as string);
        setPassword(formData.get('password') as string);

        // console.log('Username:', username);
        // console.log('Password:', password);
        // Aqui você pode enviar os dados para o backend

        if (userName === 'admin' && password === 'admin') {
            login();
            navigate('/');
            setUserName('');
            setPassword('');
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
                    <input
                        required
                        className={styles.input}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                    />
                    <input
                        required
                        className={styles.input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <input className={styles.loginButton} type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    );
}
