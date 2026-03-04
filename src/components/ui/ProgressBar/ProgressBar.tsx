import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  current: number
  total: number
  color?: string
}

const ProgressBar = ({ current, total, color }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span className={styles.label}>
          Question <strong>{current}</strong> of <strong>{total}</strong>
        </span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className={styles.fill}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
