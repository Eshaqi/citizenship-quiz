import { useEffect } from 'react'
import type { QuizState } from '@/features/quiz/types'

const STORAGE_KEY = 'citizenship_quiz_state'

export const saveQuizState = (state: QuizState): void => {
  try {
    // Only persist active or answered states — not idle or complete
    if (state.status === 'idle' || state.status === 'complete') {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
    console.warn('Could not save quiz state to localStorage')
  }
}

export const loadQuizState = (): QuizState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as QuizState
  } catch {
    return null
  }
}

export const clearQuizState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // silently fail
  }
}

// Hook — auto-saves state on every change
export const useQuizPersistence = (state: QuizState): void => {
  useEffect(() => {
    saveQuizState(state)
  }, [state])
}
