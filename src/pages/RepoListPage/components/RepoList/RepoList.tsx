import type { Repo } from '@/types/repo'
import { RepoCard } from '../RepoCard/RepoCard'
import styles from './RepoList.module.scss'
import Text from '@/components/Text'

interface RepoListProps {
  defaultText: string
  repos: Repo[]
}

export function RepoList({ defaultText, repos }: RepoListProps) {
  if (repos.length < 1) {
    return (
      <div className={styles.repoListNone}>
        <Text>{defaultText}</Text>
      </div>
    )
  }

  return (
    <div className={styles.repoList}>
      {repos.map((rep) => (
        <RepoCard
          key={rep.id}
          owner={rep.owner.login}
          title={rep.name}
          description={
            rep.description ? rep.description : 'No description provided'
          }
          stars={rep.stars}
          updatedAt={rep.updated_at}
        />
      ))}
    </div>
  )
}
