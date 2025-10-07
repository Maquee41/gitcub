import React, { useCallback } from 'react'
import { Link } from 'react-router'
import Button from '@/components/Button'
import { favouriteStore } from '@/store/FavouriteStore'
import StarIcon from '@/assets/star.svg'
import StarFillIcon from '@/assets/star-fill.svg'
import ForkIcon from '@/assets/fork.svg'
import styles from './RepoItem.module.scss'
import { observer } from 'mobx-react-lite'

interface RepoCardProps {
  owner: string
  title: string
  description: string
  archived: boolean
  stars: number
  forksCount: number
  updatedAt: Date
}

const RepoItem = observer(
  ({
    owner,
    title,
    description,
    stars,
    forksCount,
    updatedAt,
  }: RepoCardProps) => {
    const repoLink = `/repo/${owner}/${title}`

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
      <li className={styles['repo-item']}>
        <div className={styles['repo-item__image']}>
          <Link to={repoLink}>{title[0]}</Link>
        </div>
        <div className={styles['repo-item__info']}>
          <Link to={repoLink}>
            <div>
              <h2>{title}</h2>
            </div>
          </Link>
          <div>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles['repo-item__details']}>
          <div className={styles['repo-item__stats']}>
            <span className={styles['repo-item__stat']}>
              <img
                src={StarIcon}
                alt="stars"
                className={styles['repo-item__stat-icon']}
              />
              <span>{stars}</span>
            </span>
            <span className={styles['repo-item__stat']}>
              <img
                src={ForkIcon}
                alt="forks"
                className={styles['repo-item__stat-icon']}
              />
              <span>{forksCount}</span>
            </span>
          </div>
          <div>Updated {updatedAt.toLocaleDateString('en-US')}</div>
        </div>
        <div>
          <Button onClick={toggleFavourite}>
            {' '}
            {isFavourite ? (
              <img
                src={StarFillIcon}
                alt="star fill"
                className={styles['repo-item__icon']}
              />
            ) : (
              <img
                src={StarIcon}
                alt="star"
                className={styles['repo-item__icon']}
              />
            )}
          </Button>
        </div>
      </li>
    )
  }
)

export default React.memo(RepoItem)
