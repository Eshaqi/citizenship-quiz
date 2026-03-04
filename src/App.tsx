import { useState } from 'react'
import { QUESTIONS, PARTS } from '@/data'
import QuizCard from '@/features/quiz/components/QuizCard'
import { ProgressBar } from '@/components/ui'
import type { UserAnswer } from '@/features/quiz/types'
import styles from './App.module.scss'

const App = () => {
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null)
  const question = QUESTIONS[0]
  const part = PARTS.find(p => p.id === question.partId)!

  const handleAnswer = (optionId: string) => {
    if (userAnswer) return
    setUserAnswer({
      questionId: question.id,
      selectedOptionId: optionId,
      status: optionId === question.correctOptionId ? 'correct' : 'incorrect',
    })
  }

  return (
    <div className={styles.wrapper}>
      <ProgressBar current={1} total={QUESTIONS.length} color={part.color} />
      <QuizCard
        question={question}
        questionNumber={1}
        totalQuestions={QUESTIONS.length}
        userAnswer={userAnswer}
        onAnswer={handleAnswer}
      />
    </div>
  )
}

export default App
