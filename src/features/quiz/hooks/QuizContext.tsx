import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'
import { QuizReducer, initialState } from './QuizReducer'
import { useQuizPersistence, loadQuizState, clearQuizState } from './useQuizPersistence'
import type { QuizState, QuizConfig } from '@/features/quiz/types'
import type { QuizAction } from './QuizReducer'

// ─────────────────────────────────────────
// Context shape
// ─────────────────────────────────────────

interface QuizContextValue {
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
  currentQuestion: QuizState['questions'][number] | null
  currentAnswer: QuizState['userAnswers'][number] | null
  score: number
  progressPercentage: number
  isAnswered: boolean
  isComplete: boolean
  hasSavedSession: boolean
  startQuiz: (config: QuizConfig) => void
  answerQuestion: (optionId: string) => void
  nextQuestion: () => void
  restartQuiz: () => void
  resumeSession: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

// ─────────────────────────────────────────
// Provider
// ─────────────────────────────────────────

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  // Restore persisted state or start fresh
  const savedState = loadQuizState()
  const [state, dispatch] = useReducer(QuizReducer, savedState ?? initialState)

  // Auto-save on every state change
  useQuizPersistence(state)

  // Clear storage when quiz completes
  useEffect(() => {
    if (state.status === 'complete') {
      clearQuizState()
    }
  }, [state.status])

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
  const hasSavedSession =
    savedState !== null && (savedState.status === 'active' || savedState.status === 'answered')

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
    clearQuizState()
    dispatch({ type: 'RESTART_QUIZ' })
  }, [])

  const resumeSession = useCallback(() => {
    // State is already restored from localStorage — just a no-op signal
    // Navigation handled by the component consuming this
  }, [])

  // ── Memoised value ──────────────────────

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
      hasSavedSession,
      startQuiz,
      answerQuestion,
      nextQuestion,
      restartQuiz,
      resumeSession,
    }),
    [
      state,
      currentQuestion,
      currentAnswer,
      score,
      progressPercentage,
      isAnswered,
      isComplete,
      hasSavedSession,
      startQuiz,
      answerQuestion,
      nextQuestion,
      restartQuiz,
      resumeSession,
    ],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

// ─────────────────────────────────────────
// Hook
// ─────────────────────────────────────────

export const useQuiz = (): QuizContextValue => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
