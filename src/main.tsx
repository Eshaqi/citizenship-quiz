import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuizProvider } from '@/features/quiz/hooks'
import '@/styles/main.scss'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>,
)
