import React from 'react'
import RepoItem from '../RepoItem'
import Text from '@/components/Text'
import type { RepoItemModel } from '@/store/models/GitHub'
import styles from './RepoList.module.scss'

interface RepoListProps {
  defaultText: string
  repos: RepoItemModel[]
}

const RepoList = ({ defaultText, repos }: RepoListProps) => {
  if (repos.length < 1) {
    return (
      <div className={styles['repo-list__empty']}>
        <Text>{defaultText}</Text>
      </div>
    )
  }

  return (
    <ul className={styles['repo-list']}>
      {repos.map((rep) => (
        <RepoItem
          key={rep.id}
          owner={rep.owner.login}
          title={rep.name}
          description={
            rep.description ? rep.description : 'No description provided'
          }
          archived={rep.archived}
          stars={rep.stargazersCount}
          forksCount={rep.forksCount}
          updatedAt={rep.updatedAt}
        />
      ))}
    </ul>
  )
}

export default React.memo(RepoList)
