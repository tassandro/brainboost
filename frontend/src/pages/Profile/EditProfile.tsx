import { useEffect, useState, FormEvent } from 'react';
import { getCurrentUser, updateUser, User } from '@/services/userServices';
import { useAuth } from '@/context/AuthContext';
import styles from '@/pages/Profile/EditProfile.module.css';

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        setFullName(data.full_name);
        setUsername(data.username);
      })
      .catch(() => logout());
  }, [logout]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updated = await updateUser(user.id, {
        full_name: fullName,
        username,
        password: password || undefined
      });

      setUser(updated);
      setPassword('');
      setMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setMessage('Erro ao atualizar perfil');
    }
  };

  if (!user) return <div className={styles.pageWrapper}>Carregando...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>Perfil</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nome completo:</label>
          <input
            type="text"
            className={styles.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className={styles.label}>Nome de usuário:</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className={styles.label}>Nova senha (opcional):</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Salvar
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <button className={`${styles.button} ${styles.logoutButton}`} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}