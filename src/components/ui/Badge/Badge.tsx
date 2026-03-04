import styles from './Badge.module.scss'

interface BadgeProps {
  label: string
  color?: string
  tintColor?: string
}

const Badge = ({ label, color, tintColor }: BadgeProps) => {
  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: tintColor,
        color: color,
        borderColor: color,
      }}
    >
      {label}
    </span>
  )
}

export default Badge
