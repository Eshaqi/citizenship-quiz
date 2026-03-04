/* Cor domain types for the quiz */

export type PartId = 1 | 2 | 3 | 4

export interface Part {
  id: PartId
  title: string
  description: string
  color: string // used for UI theming per part
  accentColor: string // lighter tint for backgrounds
}

export interface Option {
  id: string // 'a' | 'b' | 'c' | 'd'
  text: string
}

export interface Question {
  id: string // e.g 'q1' , 'q2'
  partId: PartId
  text: string
  options: Option[]
  correctOptionId: string
}

/* Quiz runtime state types */

export type AnswerStatus = 'unanswered' | 'correct' | 'incorrect'

export interface UserAnswer {
  questionId: string
  selectedOptionId: string
  status: AnswerStatus
}

export type QuizMode = 'all' | 'part'

export interface QuizConfig {
  mode: QuizMode
  partId?: PartId
}

export type QuizStatus = 'idle' | 'active' | 'answered' | 'completed'

export interface QuizState {
  config: QuizConfig
  questions: Question[]
  currentIndex: number
  userAnswer: UserAnswer[]
  status: QuizStatus
}
