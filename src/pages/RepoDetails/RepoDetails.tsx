import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'

import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import Loader from '@/components/Loader/Loader'
import RepoHeader from './components/RepoHeader'

import { repoDetailsStore } from '@/store/RepoDetailsStore/RepoDetailsStore'

import UserLogo from '@/assets/profile.jpg'
import styles from './RepoDetails.module.scss'

export const RepoDetails = observer(() => {
  const { owner, repoName } = useParams<{ owner: string; repoName: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (owner && repoName) {
      repoDetailsStore.fetchRepo(owner, repoName)
    }
    return () => {
      repoDetailsStore.reset()
    }
  }, [owner, repoName])

  const { repo, contributors, languages, readmeHtml, loading, error } =
    repoDetailsStore

  return (
    <>
      <Header logoUrl={UserLogo} />
      <main className={styles.repolist}>
        <div className={styles.repolist__inner}>
          {loading ? (
            <div className={styles.repolist__loader}>
              <Loader />
            </div>
          ) : error ? (
            <Text>{error}</Text>
          ) : !repo ? (
            <Text>Repository not found</Text>
          ) : (
            <>
              <RepoHeader
                avatarUrl={repo.owner.avatar_url}
                ownerName={repo.owner.login}
                repoName={repo.name}
                onBack={() => navigate(-1)}
              />

              {repo.topics?.length > 0 && (
                <div className={styles.repolist__topics}>
                  {repo.topics.map((topic) => (
                    <span key={topic} className={styles.repolist__topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.repolist__stats}>
                <Text>⭐ Stars: {repo.stargazers_count}</Text>
                <Text>👀 Watching: {repo.watchers_count}</Text>
                <Text>🍴 Forks: {repo.forks_count}</Text>
                <Text>👥 Contributors: {contributors.length}</Text>
              </div>

              {languages.length > 0 && (
                <div className={styles.repolist__languages}>
                  <div className={styles.repolist__bar}>
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className={styles.repolist__segment}
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    ))}
                  </div>
                  <div className={styles.repolist__labels}>
                    {languages.map((lang) => (
                      <span key={lang.name} className={styles.repolist__label}>
                        <span
                          className={styles['repolist__labels-dot']}
                          style={{ backgroundColor: lang.color }}
                        ></span>
                        {lang.name} {lang.percentage}%
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {readmeHtml && (
                <div
                  className={styles.repolist__readme}
                  dangerouslySetInnerHTML={{ __html: readmeHtml }}
                ></div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
})
