import type { QuizState, QuizConfig, Question, UserAnswer } from '@/features/quiz/types'
import { QUESTIONS } from '@/data'

// ─────────────────────────────────────────
// Action Types
// ─────────────────────────────────────────

export type QuizAction =
  | { type: 'START_QUIZ'; payload: QuizConfig }
  | { type: 'ANSWER_QUESTION'; payload: { optionId: string } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESTART_QUIZ' }
  | { type: 'FINISH_QUIZ' }

// ─────────────────────────────────────────
// Initial State
// ─────────────────────────────────────────

export const initialState: QuizState = {
  config: { mode: 'all' },
  questions: [],
  currentIndex: 0,
  userAnswers: [],
  status: 'idle',
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

const filterQuestions = (config: QuizConfig): Question[] => {
  if (config.mode === 'part' && config.partId !== undefined) {
    return QUESTIONS.filter(q => q.partId === config.partId)
  }
  return QUESTIONS
}

const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// ─────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────

export const QuizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ': {
      const questions = shuffleArray(filterQuestions(action.payload))
      return {
        ...initialState,
        config: action.payload,
        questions,
        status: 'active',
      }
    }

    case 'ANSWER_QUESTION': {
      // Guard: only answer when active
      if (state.status !== 'active') return state

      const currentQuestion = state.questions[state.currentIndex]
      if (!currentQuestion) return state

      const isCorrect = action.payload.optionId === currentQuestion.correctOptionId

      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedOptionId: action.payload.optionId,
        status: isCorrect ? 'correct' : 'incorrect',
      }

      return {
        ...state,
        status: 'answered',
        userAnswers: [...state.userAnswers, newAnswer],
      }
    }

    case 'NEXT_QUESTION': {
      // Guard: only move next when answered
      if (state.status !== 'answered') return state

      const isLast = state.currentIndex === state.questions.length - 1

      if (isLast) {
        return { ...state, status: 'complete' }
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        status: 'active',
      }
    }

    case 'FINISH_QUIZ': {
      return { ...state, status: 'complete' }
    }

    case 'RESTART_QUIZ': {
      return initialState
    }

    default:
      return state
  }
}
