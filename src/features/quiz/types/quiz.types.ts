export type PartId = 1 | 2 | 3 | 4

export interface Part {
  readonly id: PartId
  readonly title: string
  readonly description: string
  readonly color: string
  readonly accentColor: string
}

export interface Option {
  readonly id: string
  readonly text: string
}

export interface Question {
  readonly id: string
  readonly partId: PartId
  readonly text: string
  readonly options: readonly Option[]
  readonly correctOptionId: string
}

export type AnswerStatus = 'unanswered' | 'correct' | 'incorrect'

export interface UserAnswer {
  readonly questionId: string
  readonly selectedOptionId: string
  readonly status: AnswerStatus
}

export type QuizMode = 'all' | 'part'

export interface QuizConfig {
  readonly mode: QuizMode
  readonly partId?: PartId
}

export type QuizStatus = 'idle' | 'active' | 'answered' | 'complete'

export interface QuizState {
  readonly config: QuizConfig
  readonly questions: readonly Question[]
  readonly currentIndex: number
  readonly userAnswers: readonly UserAnswer[]
  readonly status: QuizStatus
}
