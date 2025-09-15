import Text from '@/components/Text'
import styles from './RepoCard.module.scss'
import { Link } from 'react-router'

interface RepoCardProps {
  owner: string
  title: string
  description: string
  stars: number
  updatedAt: string
}

export function RepoCard({
  owner,
  title,
  description,
  stars,
  updatedAt,
}: RepoCardProps) {
  return (
    <Link to={`/repo/${owner}/${title}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Text tag="h3" className={styles.title}>
            {title}
          </Text>
          <div className={styles.meta}>
            <img src="/star.svg" alt="Stars" className={styles.icon} />
            <Text className={styles.stars}>{stars}</Text>
            <Text className={styles.updated}>
              Updated{' '}
              {new Date(updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </div>
        </div>
        <Text className={styles.description}>{description}</Text>
      </div>
    </Link>
  )
}
