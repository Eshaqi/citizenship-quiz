import { useEffect } from 'react'

interface UseKeyboardOptions {
  onSelectOption: (index: number) => void
  onNext: () => void
  isAnswered: boolean
  optionCount: number
  enabled: boolean
}

const KEY_MAP: Record<string, number> = {
  a: 0,
  '1': 0,
  b: 1,
  '2': 1,
  c: 2,
  '3': 2,
  d: 3,
  '4': 3,
}

export const useKeyboard = ({
  onSelectOption,
  onNext,
  isAnswered,
  optionCount,
  enabled,
}: UseKeyboardOptions) => {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement) return
      if (e.target instanceof HTMLTextAreaElement) return

      const key = e.key.toLowerCase()

      // Select option via A/B/C/D or 1/2/3/4
      if (!isAnswered && key in KEY_MAP) {
        const index = KEY_MAP[key]
        if (index < optionCount) {
          e.preventDefault()
          onSelectOption(index)
        }
        return
      }

      // Advance to next via Enter or Space or ArrowRight
      if (isAnswered && (key === 'enter' || key === ' ' || key === 'arrowright')) {
        e.preventDefault()
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, isAnswered, optionCount, onSelectOption, onNext])
}
