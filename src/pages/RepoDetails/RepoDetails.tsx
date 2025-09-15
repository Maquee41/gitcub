import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import Loader from '@/components/Loader/Loader'
import {
  getRepoDetails,
  getRepoContributors,
  getRepoLanguages,
  getRepoReadme,
} from '@/api/reposDetailed'
import styles from './RepoDetails.module.scss'
import type { LanguageType, RepoDetailsType } from '@/types/repo'
import { languageColors } from '@/constants/repoDetails'
import { RepoHeader } from './components/RepoHeader'

function getLanguageColor(name: string) {
  return languageColors[name] || '#ededed'
}

export function RepoDetails() {
  const { owner, repoName } = useParams<{ owner: string; repoName: string }>()
  const navigate = useNavigate()
  const [repo, setRepo] = useState<RepoDetailsType | null>(null)
  const [contributors, setContributors] = useState([])
  const [languages, setLanguages] = useState<LanguageType[]>([])
  const [readmeHtml, setReadmeHtml] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!owner || !repoName) return

    const fetchRepo = async () => {
      setLoading(true)
      setError(null)
      try {
        const repoData = await getRepoDetails(owner, repoName)
        setRepo(repoData)

        const contributorsData = await getRepoContributors(owner, repoName)
        setContributors(contributorsData)

        const languagesData = await getRepoLanguages(owner, repoName)
        const total = Object.values(
          languagesData as Record<string, number>
        ).reduce((acc, val) => acc + val, 0)

        const formattedLanguages: LanguageType[] = Object.entries(
          languagesData
        ).map(([name, size]) => ({
          name,
          percentage: Math.round(((size as number) / total) * 100),
          color: getLanguageColor(name),
        }))

        setLanguages(formattedLanguages)

        const readmeData = await getRepoReadme(owner, repoName)
        setReadmeHtml(readmeData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepo()
  }, [owner, repoName])

  return (
    <>
      <Header logoUrl="/profile.jpg" />
      <main className={styles.main}>
        <div className={styles.inner}>
          {loading ? (
            <div className={styles.loaderContainer}>
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
                <div className={styles.topics}>
                  {repo.topics.map((topic) => (
                    <span key={topic} className={styles.topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.stats}>
                <span>⭐ Stars: {repo.stargazers_count}</span>
                <span>👀 Watching: {repo.watchers_count}</span>
                <span>🍴 Forks: {repo.forks_count}</span>
                <span>👥 Contributors: {contributors.length}</span>
              </div>

              {languages.length > 0 && (
                <div className={styles.languages}>
                  <div className={styles.bar}>
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className={styles.segment}
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    ))}
                  </div>
                  <div className={styles.labels}>
                    {languages.map((lang) => (
                      <span key={lang.name}>
                        <span
                          className={styles.dot}
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
                  className={styles.readme}
                  dangerouslySetInnerHTML={{ __html: readmeHtml }}
                ></div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
