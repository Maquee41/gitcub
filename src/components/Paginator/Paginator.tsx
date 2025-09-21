import clsx from 'clsx'
import Button from '@/components/Button'
import styles from './Paginator.module.scss'

interface PaginatorProps {
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Paginator({
  currentPage,
  onPageChange,
  className,
}: PaginatorProps) {
  const pages: (number | '…')[] = []

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
          <Button
            key={num}
            className={clsx(styles.pagination__button, {
              [styles.active]: num === currentPage,
            })}
            onClick={() => onPageChange(num)}
          >
            {num}
          </Button>
        )
      )}
    </div>
  )
}
