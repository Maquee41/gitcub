import { Link } from 'react-router'
import Text from '@/components/Text'
import styles from './RepoCard.module.scss'
import StarIcon from '@/assets/star.svg'

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
      <div className={styles['repo-card']}>
        <div className={styles['repo-card__header']}>
          <Text tag="h3" className={styles['repo-card__title']}>
            {title}
          </Text>
          <div className={styles['repo-card__meta']}>
            <img
              src={StarIcon}
              alt="Stars"
              className={styles['repo-card__icon']}
            />
            <Text className={styles['repo-card__stars']}>{stars}</Text>
            <Text className={styles['repo-card__updated']}>
              Updated{' '}
              {new Date(updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </div>
        </div>
        <Text className={styles['repo-card__description']}>{description}</Text>
      </div>
    </Link>
  )
}
