import { Outlet } from 'react-router-dom'
import styles from './AppLayout.module.scss'

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>🇦🇺</span>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Citizenship Quiz</span>
            <span className={styles.logoSub}>Our Common Bond</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>
          Based on <em>Australian Citizenship: Our Common Bond</em>
        </p>
        <p>© Commonwealth of Australia 2026</p>
      </footer>
    </div>
  )
}

export default AppLayout
