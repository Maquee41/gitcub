import React from 'react'
import Button from '@/components/Button'
import Text from '@/components/Text'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import styles from './RepoHeader.module.scss'

interface RepoHeaderProps {
  avatarUrl: string
  ownerName: string
  repoName: string
  onBack: () => void
}

const RepoHeader = ({
  avatarUrl,
  ownerName,
  repoName,
  onBack,
}: RepoHeaderProps) => {
  return (
    <div className={styles['repo-header']}>
      <Button className={styles['repo-header__back-button']} onClick={onBack}>
        <ArrowDownIcon
          width={30}
          height={30}
          className={styles['repo-header__back-button-img']}
        />
      </Button>
      <img
        src={avatarUrl}
        alt={ownerName}
        className={styles['repo-header__avatar']}
      />
      <div>
        <Text tag="h2">{repoName}</Text>
      </div>
    </div>
  )
}

export default React.memo(RepoHeader)
