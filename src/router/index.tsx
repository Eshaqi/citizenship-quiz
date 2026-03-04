import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import ScrollToTop from './ScrollToTop'
import { HomePage, QuizPage, ResultsPage, NotFoundPage } from '@/pages'

const RootLayout = () => (
  <>
    <ScrollToTop />
    <AppLayout />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
