import React from 'react'
import type { RepoDetailsType } from '@/store/RepoListStore/repo'
import RepoCard from '../RepoCard/RepoCard'
import styles from './RepoList.module.scss'
import Text from '@/components/Text'

interface RepoListProps {
  defaultText: string
  repos: RepoDetailsType[]
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
          stars={rep.stargazers_count}
          updatedAt={rep.updated_at}
        />
      ))}
    </div>
  )
}

export default React.memo(RepoList)
