import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuizProvider } from '@/features/quiz/hooks'
import { AppRouter } from '@/router'
import '@/styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <AppRouter />
    </QuizProvider>
  </StrictMode>,
)
