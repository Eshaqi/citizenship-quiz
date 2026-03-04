import { createContext, useContext, useReducer, useCallback, useMemo, type ReactNode } from 'react'
import type { QuizState, QuizConfig } from '@/features/quiz/types'
import { initialState, QuizAction, QuizReducer } from './QuizReducer'

// ─────────────────────────────────────────
// Context shape
// ─────────────────────────────────────────

interface QuizContextValue {
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
  // Derived helpers — computed once here, consumed anywhere
  currentQuestion: QuizState['questions'][number] | null
  currentAnswer: QuizState['userAnswers'][number] | null
  score: number
  progressPercentage: number
  isAnswered: boolean
  isComplete: boolean
  // Action dispatchers
  startQuiz: (config: QuizConfig) => void
  answerQuestion: (optionId: string) => void
  nextQuestion: () => void
  restartQuiz: () => void
}

// ─────────────────────────────────────────
// Create context
// ─────────────────────────────────────────

const QuizContext = createContext<QuizContextValue | null>(null)

// ─────────────────────────────────────────
// Provider
// ─────────────────────────────────────────

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState)

  // ── Derived state ───────────────────────

  const currentQuestion = state.questions[state.currentIndex] ?? null

  const currentAnswer = state.userAnswers.find(a => a.questionId === currentQuestion?.id) ?? null

  const score = state.userAnswers.filter(a => a.status === 'correct').length

  const progressPercentage =
    state.questions.length === 0
      ? 0
      : Math.round(
          ((state.currentIndex + (state.status === 'answered' ? 1 : 0)) / state.questions.length) *
            100,
        )

  const isAnswered = state.status === 'answered'
  const isComplete = state.status === 'complete'

  // ── Action dispatchers ──────────────────

  const startQuiz = useCallback((config: QuizConfig) => {
    dispatch({ type: 'START_QUIZ', payload: config })
  }, [])

  const answerQuestion = useCallback((optionId: string) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { optionId } })
  }, [])

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' })
  }, [])

  const restartQuiz = useCallback(() => {
    dispatch({ type: 'RESTART_QUIZ' })
  }, [])

  // ── Memoised context value ──────────────

  const value = useMemo<QuizContextValue>(
    () => ({
      state,
      dispatch,
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
    }),
    [
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
    ],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

// ─────────────────────────────────────────
// Hook — safe consumer
// ─────────────────────────────────────────

export const useQuiz = (): QuizContextValue => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
