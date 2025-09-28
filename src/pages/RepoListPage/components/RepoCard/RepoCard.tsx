import React, { useCallback } from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'
import StarIcon from '@/assets/star.svg'
import StarFillIcon from '@/assets/star-fill.svg'
import Button from '@/components/Button'
import Text from '@/components/Text'
import { favouriteStore } from '@/store/FavouriteStore'
import styles from './RepoCard.module.scss'

interface RepoCardProps {
  owner: string
  title: string
  description: string
  stars: number
  updatedAt: Date
}

const RepoCard = observer(
  ({ owner, title, description, stars, updatedAt }: RepoCardProps) => {
    const isFavourite = favouriteStore.isFavourite(title)

    const toggleFavourite = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        favouriteStore.toggle({
          account: owner,
          repoName: title,
        })
      },
      [owner, title]
    )

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
                alt="star"
                className={styles['repo-card__icon']}
              />
              <Text className={styles['repo-card__stars']}>{stars}</Text>
              <Text className={styles['repo-card__updated']}>
                {updatedAt.toLocaleDateString('en-US')}
              </Text>
            </div>
          </div>
          <div className={styles['repo-card__footer']}>
            <Text className={styles['repo-card__footer-text']}>
              {description}
            </Text>
            <Button onClick={toggleFavourite}>
              {isFavourite ? (
                <img
                  src={StarFillIcon}
                  alt="star fill"
                  className={styles['repo-card__icon']}
                />
              ) : (
                <img
                  src={StarIcon}
                  alt="star"
                  className={styles['repo-card__icon']}
                />
              )}
            </Button>
          </div>
        </div>
      </Link>
    )
  }
)

export default React.memo(RepoCard)
