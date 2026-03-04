import { useQuiz } from '@/features/quiz/hooks'
import QuizCard from '@/features/quiz/components/QuizCard'
import { ProgressBar } from '@/components/ui'
import { PARTS } from '@/data'
import styles from './App.module.scss'

const App = () => {
  const {
    state,
    currentQuestion,
    currentAnswer,
    score,
    progressPercentage,
    isAnswered,
    isComplete,
    startQuiz,
    answerQuestion,
    nextQuestion,
    restartQuiz,
  } = useQuiz()

  const part = currentQuestion ? PARTS.find(p => p.id === currentQuestion.partId)! : null

  // ── Idle screen ─────────────────────────
  if (state.status === 'idle') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <h1>🇦🇺 Citizenship Quiz</h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>
            Test your knowledge across all 4 parts
          </p>
          <div className={styles.startButtons}>
            <button className={styles.btnPrimary} onClick={() => startQuiz({ mode: 'all' })}>
              All Questions
            </button>
            {[1, 2, 3, 4].map(id => (
              <button
                key={id}
                className={styles.btnSecondary}
                onClick={() => startQuiz({ mode: 'part', partId: id as 1 | 2 | 3 | 4 })}
              >
                Part {id} Only
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Complete screen ─────────────────────
  if (isComplete) {
    const total = state.questions.length
    const percentage = Math.round((score / total) * 100)

    return (
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <h1>{percentage >= 75 ? '🎉' : '📚'} Quiz Complete!</h1>
          <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>
            You scored <strong>{score}</strong> out of <strong>{total}</strong> ({percentage}%)
          </p>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>
            {percentage >= 75 ? 'Great work — you passed!' : 'Keep studying and try again!'}
          </p>
          <div className={styles.startButtons}>
            <button className={styles.btnPrimary} onClick={restartQuiz}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Active / Answered screen ────────────
  if (!currentQuestion || !part) return null

  return (
    <div className={styles.wrapper}>
      <ProgressBar
        current={state.currentIndex + 1}
        total={state.questions.length}
        color={part.color}
      />

      <QuizCard
        question={currentQuestion}
        questionNumber={state.currentIndex + 1}
        totalQuestions={state.questions.length}
        userAnswer={currentAnswer}
        onAnswer={answerQuestion}
      />

      {isAnswered && (
        <div className={styles.nextRow}>
          <p className="text-muted text-sm">
            Score so far: <strong>{score}</strong> correct ({progressPercentage}% done)
          </p>
          <button className={styles.btnPrimary} onClick={nextQuestion}>
            {state.currentIndex === state.questions.length - 1 ? 'See Results' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
