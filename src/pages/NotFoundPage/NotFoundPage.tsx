import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        <span className={styles.emoji}>🤔</span>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.sub}>This page doesn't exist. Let's get you back on track.</p>
        <button className={styles.btn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
