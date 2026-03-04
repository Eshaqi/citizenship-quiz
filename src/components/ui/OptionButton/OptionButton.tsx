import { AnswerStatus } from '@/features/quiz/types'
import styles from './OptionButton.module.scss'

interface OptionButtonProps {
  id: string
  label: string //'A' | 'B' | 'C' | 'D'
  text: string
  status: AnswerStatus | 'idle'
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}

const StatusIcon = ({ status }: { status: AnswerStatus | 'idle' }) => {
  if (status === 'correct') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
        <path
          d="M7 12.5l3.5 3.5 6.5-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (status === 'incorrect') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
        <path
          d="M8.5 8.5l7 7M15.5 8.5l-7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return null
}

const OptionButton = ({
  id,
  label,
  text,
  status,
  isSelected,
  isDisabled,
  onClick,
}: OptionButtonProps) => {
  const classNames = [
    styles.options,
    isSelected ? styles.selected : '',
    status === 'correct' ? styles.correct : '',
    status === 'incorrect' ? styles.incorrect : '',
    isDisabled && !isSelected ? styles.dimmed : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      id={id}
      className={classNames}
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.text}>{text}</span>
      {isSelected && <StatusIcon status={status} />}
    </button>
  )
}

export default OptionButton
