import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Sidebar.module.css';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Админ-панель</h2>
      </div>
      <nav className={styles.nav}>
        <Link href="/admin/dashboard" className={router.pathname === '/admin/dashboard' ? styles.active : ''}>
          <span>📊</span> Дэшборд
        </Link>
        <Link href="/admin/trainers" className={router.pathname === '/admin/trainers' ? styles.active : ''}>
          <span>🎯</span> Тренажеры
        </Link>
      </nav>
    </div>
  );
}; 