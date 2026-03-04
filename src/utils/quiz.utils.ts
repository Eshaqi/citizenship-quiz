import type { UserAnswer, Question, PartId } from '@/features/quiz/types'

/**
 * Calculate score from a list of answers
 */
export const calculateScore = (answers: readonly UserAnswer[]): number =>
  answers.filter(a => a.status === 'correct').length

/**
 * Calculate percentage — always returns 0 if total is 0
 */
export const calculatePercentage = (score: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}

/**
 * Check if the user passed (75% threshold)
 */
export const hasPassed = (score: number, total: number): boolean =>
  calculatePercentage(score, total) >= 75

/**
 * Get answers filtered to a specific part
 */
export const getAnswersForPart = (
  answers: readonly UserAnswer[],
  questions: readonly Question[],
  partId: PartId,
): UserAnswer[] =>
  answers.filter(a => {
    const q = questions.find(q => q.id === a.questionId)
    return q?.partId === partId
  })

/**
 * Get questions for a specific part
 */
export const getQuestionsForPart = (questions: readonly Question[], partId: PartId): Question[] =>
  questions.filter(q => q.partId === partId)

/**
 * Format a percentage string
 */
export const formatPercentage = (value: number): string => `${value}%`

/**
 * Get a result message based on percentage
 */
export const getResultMessage = (percentage: number): string => {
  if (percentage === 100) return 'Perfect score! Outstanding!'
  if (percentage >= 90) return "Excellent — you're very well prepared!"
  if (percentage >= 75) return 'Great work — you passed!'
  if (percentage >= 60) return 'Getting close — keep reviewing!'
  if (percentage >= 40) return 'Keep studying the Our Common Bond booklet.'
  return 'Review all four parts carefully and try again.'
}

/**
 * Get emoji for a result percentage
 */
export const getResultEmoji = (percentage: number): string => {
  if (percentage === 100) return '🏆'
  if (percentage >= 90) return '🌟'
  if (percentage >= 75) return '🎉'
  if (percentage >= 60) return '📖'
  return '📚'
}
