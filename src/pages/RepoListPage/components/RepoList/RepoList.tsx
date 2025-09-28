import React from 'react'
import RepoCard from '../RepoCard/RepoCard'
import styles from './RepoList.module.scss'
import Text from '@/components/Text'
import type { RepoItemModel } from '@/store/models/GitHub'

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
    <div className={styles['repo-list']}>
      {repos.map((rep) => (
        <RepoCard
          key={rep.id}
          owner={rep.owner.login}
          title={rep.name}
          description={
            rep.description ? rep.description : 'No description provided'
          }
          stars={rep.stargazersCount}
          updatedAt={rep.updatedAt}
        />
      ))}
    </div>
  )
}

export default React.memo(RepoList)
