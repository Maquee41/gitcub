import Text from '@/components/Text'

import styles from './RepoHeader.module.scss'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'

type RepoHeaderProps = {
  avatarUrl: string
  ownerName: string
  repoName: string
  onBack: () => void
}

export function RepoHeader({
  avatarUrl,
  ownerName,
  repoName,
  onBack,
}: RepoHeaderProps) {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowDownIcon
          width={30}
          height={30}
          className={styles.backButtonImg}
        />
      </button>
      <img src={avatarUrl} alt={ownerName} className={styles.avatar} />
      <div>
        <Text tag="h2">{repoName}</Text>
      </div>
    </div>
  )
}
