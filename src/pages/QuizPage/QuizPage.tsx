import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz, useKeyboard } from '@/features/quiz/hooks'
import { PARTS } from '@/data'
import QuizCard from '@/features/quiz/components/QuizCard'
import { ProgressBar } from '@/components/ui'
import styles from './QuizPage.module.scss'

const QuizPage = () => {
  const navigate = useNavigate()
  const {
    state,
    currentQuestion,
    currentAnswer,
    score,
    isAnswered,
    isComplete,
    answerQuestion,
    nextQuestion,
  } = useQuiz()

  // Redirect if quiz not started
  useEffect(() => {
    if (state.status === 'idle') {
      navigate('/', { replace: true })
    }
  }, [state.status, navigate])

  // Redirect to results when complete
  useEffect(() => {
    if (isComplete) {
      navigate('/results', { replace: true })
    }
  }, [isComplete, navigate])

  // Keyboard: select option by index from question.options array
  const handleKeyboardSelect = useCallback(
    (index: number) => {
      if (!currentQuestion) return
      const option = currentQuestion.options[index]
      if (option) answerQuestion(option.id)
    },
    [currentQuestion, answerQuestion],
  )

  useKeyboard({
    onSelectOption: handleKeyboardSelect,
    onNext: nextQuestion,
    isAnswered,
    optionCount: currentQuestion?.options.length ?? 0,
    enabled: state.status === 'active' || state.status === 'answered',
  })

  if (!currentQuestion) return null

  const part = PARTS.find(p => p.id === currentQuestion.partId)!
  const isLastQuestion = state.currentIndex === state.questions.length - 1

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* ── Keyboard hint ── */}
        <div className={styles.keyboardHint}>
          <kbd>A</kbd>
          <kbd>B</kbd>
          <kbd>C</kbd>
          <kbd>D</kbd>
          <span>to select</span>
          {isAnswered && (
            <>
              <span className={styles.hintDivider}>·</span>
              <kbd>Enter</kbd>
              <span>to continue</span>
            </>
          )}
        </div>

        {/* ── Progress ── */}
        <div className={styles.progressWrapper}>
          <ProgressBar
            current={state.currentIndex + 1}
            total={state.questions.length}
            color={part.color}
          />
        </div>

        {/* ── Quiz Card ── */}
        <QuizCard
          question={currentQuestion}
          questionNumber={state.currentIndex + 1}
          totalQuestions={state.questions.length}
          userAnswer={currentAnswer}
          onAnswer={answerQuestion}
        />

        {/* ── Feedback bar ── */}
        {isAnswered && (
          <div
            className={styles.feedbackBar}
            style={{
              backgroundColor: currentAnswer?.status === 'correct' ? '#E8F5E9' : '#FFEBEE',
              borderColor: currentAnswer?.status === 'correct' ? '#A5D6A7' : '#EF9A9A',
            }}
          >
            <div className={styles.feedbackLeft}>
              <span className={styles.feedbackIcon}>
                {currentAnswer?.status === 'correct' ? '✅' : '❌'}
              </span>
              <div className={styles.feedbackText}>
                <strong>
                  {currentAnswer?.status === 'correct'
                    ? 'Correct!'
                    : 'Incorrect — see the correct answer above'}
                </strong>
                <span>
                  Score: {score} / {state.currentIndex + 1}
                </span>
              </div>
            </div>

            <button
              className={styles.btnNext}
              onClick={nextQuestion}
              style={{ backgroundColor: part.color }}
            >
              {isLastQuestion ? 'See Results 🏁' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage
