import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Navigation.module.css';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>📚</span> Образовательный портал
        </Link>
        <div className={styles.links}>
          <Link 
            to="/trainers" 
            className={location.pathname === '/trainers' ? styles.active : ''}
          >
            Тренажеры
          </Link>
          <Link 
            to="/courses" 
            className={location.pathname === '/courses' ? styles.active : ''}
          >
            Курсы
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? styles.active : ''}
          >
            О нас
          </Link>
        </div>
      </div>
    </nav>
  );
}; 