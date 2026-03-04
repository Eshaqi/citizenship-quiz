import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import { HomePage, QuizPage, ResultsPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'results', element: <ResultsPage /> },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
