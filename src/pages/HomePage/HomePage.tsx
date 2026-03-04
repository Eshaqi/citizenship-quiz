import { useNavigate } from 'react-router-dom'
import { PARTS, QUESTIONS } from '@/data'
import { useQuiz } from '@/features/quiz/hooks'
import type { PartId, QuizConfig } from '@/features/quiz/types'
import styles from './HomePage.module.scss'

const HomePage = () => {
  const navigate = useNavigate()
  const { startQuiz } = useQuiz()

  const handleStart = (config: QuizConfig) => {
    startQuiz(config)
    navigate('/quiz')
  }

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Prepare for your
              <span className={styles.heroAccent}> Citizenship Test</span>
            </h1>
            <p className={styles.heroSub}>
              Practice all {QUESTIONS.length} questions across 4 parts of the{' '}
              <em>Our Common Bond</em> resource book.
            </p>
          </div>

          <button className={styles.btnAll} onClick={() => handleStart({ mode: 'all' })}>
            <span className={styles.btnAllIcon}>🚀</span>
            <span className={styles.btnAllText}>
              <strong>Start Full Quiz</strong>
              <small>All {QUESTIONS.length} questions — all parts</small>
            </span>
          </button>
        </div>
      </section>

      {/* ── Part cards ── */}
      <section className={styles.parts}>
        <div className={styles.partsInner}>
          <h2 className={styles.sectionTitle}>Or practise by part</h2>

          <div className={styles.partsGrid}>
            {PARTS.map(part => {
              const count = QUESTIONS.filter(q => q.partId === part.id).length

              return (
                <article
                  key={part.id}
                  className={styles.partCard}
                  style={{ borderTopColor: part.color }}
                >
                  <div className={styles.partCardHeader}>
                    <span
                      className={styles.partNumber}
                      style={{ backgroundColor: part.accentColor, color: part.color }}
                    >
                      Part {part.id}
                    </span>
                    <span className={styles.partCount}>{count} questions</span>
                  </div>

                  <h3 className={styles.partTitle} style={{ color: part.color }}>
                    {part.title}
                  </h3>

                  <p className={styles.partDesc}>{part.description}</p>

                  <button
                    className={styles.btnPart}
                    style={{
                      backgroundColor: part.accentColor,
                      color: part.color,
                      borderColor: part.color,
                    }}
                    onClick={() => handleStart({ mode: 'part', partId: part.id as PartId })}
                  >
                    Start Part {part.id}
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section className={styles.info}>
        <div className={styles.infoInner}>
          {[
            { icon: '✅', label: 'Pass mark', value: '75%' },
            { icon: '📝', label: 'Test format', value: '20 questions' },
            { icon: '⭐', label: 'Values questions', value: 'All 5 must pass' },
            { icon: '🔀', label: 'Questions', value: 'Randomly shuffled' },
          ].map(item => (
            <div key={item.label} className={styles.infoItem}>
              <span className={styles.infoIcon}>{item.icon}</span>
              <span className={styles.infoValue}>{item.value}</span>
              <span className={styles.infoLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
