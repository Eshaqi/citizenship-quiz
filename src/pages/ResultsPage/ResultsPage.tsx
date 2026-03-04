import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/features/quiz/hooks'
import { PARTS, QUESTIONS } from '@/data'
import styles from './ResultsPage.module.scss'

const ResultsPage = () => {
  const navigate = useNavigate()
  const { state, score, restartQuiz } = useQuiz()

  // Redirect if no quiz was completed
  useEffect(() => {
    if (state.status !== 'complete') {
      navigate('/', { replace: true })
    }
  }, [state.status, navigate])

  if (state.status !== 'complete') return null

  const total = state.questions.length
  const percentage = Math.round((score / total) * 100)
  const passed = percentage >= 75

  // ── Per-part breakdown ──────────────────
  const partBreakdown = PARTS.map(part => {
    const partQuestions = state.questions.filter(q => q.partId === part.id)
    const partAnswers = state.userAnswers.filter(a => {
      const q = state.questions.find(q => q.id === a.questionId)
      return q?.partId === part.id
    })
    const partScore = partAnswers.filter(a => a.status === 'correct').length
    const partTotal = partQuestions.length
    const partPct = partTotal > 0 ? Math.round((partScore / partTotal) * 100) : 0

    return { part, partScore, partTotal, partPct }
  }).filter(b => b.partTotal > 0)

  const handleRestart = () => {
    restartQuiz()
    navigate('/')
  }

  const handleRetry = () => {
    restartQuiz()
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* ── Result hero ── */}
        <div className={styles.hero}>
          <div
            className={styles.scoreCircle}
            style={{
              borderColor: passed ? '#2E7D32' : '#C62828',
              backgroundColor: passed ? '#E8F5E9' : '#FFEBEE',
            }}
          >
            <span className={styles.scoreEmoji}>{passed ? '🎉' : '📚'}</span>
            <span className={styles.scoreNumber} style={{ color: passed ? '#2E7D32' : '#C62828' }}>
              {percentage}%
            </span>
            <span className={styles.scoreLabel}>
              {score}/{total}
            </span>
          </div>

          <div className={styles.heroText}>
            <h1 className={styles.resultTitle}>{passed ? 'Congratulations!' : 'Keep Studying!'}</h1>
            <p className={styles.resultSub}>
              {passed
                ? "You're well prepared for the Australian citizenship test!"
                : 'You need 75% to pass. Review the Our Common Bond booklet and try again.'}
            </p>

            <div
              className={styles.passBadge}
              style={{
                backgroundColor: passed ? '#E8F5E9' : '#FFEBEE',
                color: passed ? '#2E7D32' : '#C62828',
                borderColor: passed ? '#A5D6A7' : '#EF9A9A',
              }}
            >
              {passed ? '✅ Pass — 75% achieved' : '❌ Not yet — below 75%'}
            </div>
          </div>
        </div>

        {/* ── Part breakdown ── */}
        {partBreakdown.length > 0 && (
          <div className={styles.breakdown}>
            <h2 className={styles.breakdownTitle}>Breakdown by Part</h2>
            <div className={styles.breakdownGrid}>
              {partBreakdown.map(({ part, partScore, partTotal, partPct }) => (
                <div
                  key={part.id}
                  className={styles.breakdownCard}
                  style={{ borderTopColor: part.color }}
                >
                  <div className={styles.breakdownHeader}>
                    <span
                      className={styles.breakdownPartNum}
                      style={{
                        backgroundColor: part.accentColor,
                        color: part.color,
                      }}
                    >
                      Part {part.id}
                    </span>
                    <span
                      className={styles.breakdownPct}
                      style={{ color: partPct >= 75 ? '#2E7D32' : '#C62828' }}
                    >
                      {partPct}%
                    </span>
                  </div>

                  <p className={styles.breakdownPartTitle}>{part.title}</p>

                  <div className={styles.breakdownBar}>
                    <div
                      className={styles.breakdownFill}
                      style={{
                        width: `${partPct}%`,
                        backgroundColor: partPct >= 75 ? '#2E7D32' : '#C62828',
                      }}
                    />
                  </div>

                  <p className={styles.breakdownScore}>
                    {partScore} / {partTotal} correct
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Review incorrect ── */}
        {state.userAnswers.some(a => a.status === 'incorrect') && (
          <div className={styles.review}>
            <h2 className={styles.reviewTitle}>❌ Questions to Review</h2>
            <div className={styles.reviewList}>
              {state.userAnswers
                .filter(a => a.status === 'incorrect')
                .map(answer => {
                  const question = QUESTIONS.find(q => q.id === answer.questionId)
                  if (!question) return null
                  const correctOption = question.options.find(
                    o => o.id === question.correctOptionId,
                  )
                  const selectedOption = question.options.find(
                    o => o.id === answer.selectedOptionId,
                  )
                  const part = PARTS.find(p => p.id === question.partId)!

                  return (
                    <div key={answer.questionId} className={styles.reviewItem}>
                      <div className={styles.reviewMeta}>
                        <span
                          className={styles.reviewPart}
                          style={{
                            backgroundColor: part.accentColor,
                            color: part.color,
                          }}
                        >
                          Part {part.id}
                        </span>
                      </div>
                      <p className={styles.reviewQuestion}>{question.text}</p>
                      <p className={styles.reviewWrong}>
                        <span>❌ Your answer:</span> {selectedOption?.text}
                      </p>
                      <p className={styles.reviewCorrect}>
                        <span>✅ Correct answer:</span> {correctOption?.text}
                      </p>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={handleRetry}>
            🔄 Try Again
          </button>
          <button className={styles.btnSecondary} onClick={handleRestart}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
