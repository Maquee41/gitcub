import Text from '@/components/Text'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import styles from './RepoHeader.module.scss'

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
    <div className={styles['repo-header']}>
      <button className={styles['repo-header__back-button']} onClick={onBack}>
        <ArrowDownIcon
          width={30}
          height={30}
          className={styles['repo-header__back-button-img']}
        />
      </button>
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
