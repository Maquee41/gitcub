import styles from './Pagination.module.scss'
import clsx from 'clsx'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  currentPage,
  onPageChange,
  className,
}: PaginationProps) {
  const pages: (number | string)[] = []

  pages.push(1)

  if (currentPage > 4) pages.push('…')

  const start = Math.max(2, currentPage - 1)
  const end = currentPage + 1

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  pages.push('…')

  pages.push(end + 1)

  return (
    <div className={clsx(styles.pagination, className)}>
      {pages.map((num, index) =>
        num === '…' ? (
          <span key={`dots-${index}`} className={styles.pagination__dots}>
            …
          </span>
        ) : (
          <button
            key={num}
            className={clsx(styles.pagination__button, {
              [styles.active]: num === currentPage,
            })}
            onClick={() => onPageChange(num as number)}
          >
            {num}
          </button>
        )
      )}
    </div>
  )
}
