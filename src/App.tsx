import { QUESTIONS, PARTS } from '@/data'

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'inherit' }}>
      <h1>🇦🇺 Citizenship Quiz</h1>
      <p className="text-muted" style={{ marginTop: '0.5rem' }}>
        {PARTS.length} parts · {QUESTIONS.length} questions
      </p>
      <h3 style={{ marginTop: '1.5rem' }}>Heading 3 — fluid scale</h3>
      <h4>Heading 4</h4>
      <p className="text-sm text-muted">Small muted text</p>
      <p className="text-success font-semibold">Success colour</p>
      <p className="text-error font-semibold">Error colour</p>
    </div>
  )
}

export default App
