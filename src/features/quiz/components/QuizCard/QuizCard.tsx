import { PARTS } from '@/data'
import { Question, UserAnswer } from '@/features/quiz/types'
import styles from './QuizCard.module.scss'
import Badge from '@/components/ui/Badge'
import OptionButton from '@/components/ui/OptionButton'

interface QuizCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  userAnswer: UserAnswer | null
  onAnswer: (optionId: string) => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswer,
}: QuizCardProps) => {
  const part = PARTS.find(p => p.id === question.partId)!
  const isAnswered = userAnswer !== null

  return (
    <article className={styles.card}>
      {/* ------ Header -------*/}
      <header className={styles.header}>
        <div className={styles.meta}>
          <Badge label={`Part ${part.id}`} color={part.color} tintColor={part.accentColor} />
          <span className={styles.counter}>
            {questionNumber} / {totalQuestions}{' '}
          </span>
        </div>
        <p className={styles.partTitle}>{part.title}</p>
      </header>

      {/** ---- Question ------ */}
      <div className={styles.question}>
        <h2 className={styles.questionText}>{question.text}</h2>
      </div>

      {/** -------- Options -------------- */}

      {/* ── Options ── */}
      <div className={styles.options} role="list">
        {question.options.map((option, index) => {
          const isSelected = userAnswer?.selectedOptionId === option.id

          // After answering — also highlight correct if user was wrong
          const resolvedStatus = (() => {
            if (!isAnswered) return 'idle'
            if (isSelected) return userAnswer.status
            if (option.id === question.correctOptionId) return 'correct'
            return 'idle'
          })()

          return (
            <div role="listitem" key={option.id}>
              <OptionButton
                id={`option-${option.id}`}
                label={OPTION_LABELS[index]}
                text={option.text}
                status={resolvedStatus}
                isSelected={isSelected}
                isDisabled={isAnswered}
                onClick={() => onAnswer(option.id)}
              />
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default QuizCard
