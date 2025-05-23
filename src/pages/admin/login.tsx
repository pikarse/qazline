import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'TatyanaErm' && password === 'deash279') {
      router.push('/admin/dashboard');
    } else {
      alert('Неверные учетные данные');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Вход в админ-панель</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Логин:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
} 