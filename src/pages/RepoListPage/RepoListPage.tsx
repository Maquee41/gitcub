import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import Input from '@/components/Input'
import Button from '@/components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import RepoList from './components/RepoList/RepoList'
import Paginator from '@/components/Paginator'
import Loader from '@/components/Loader/Loader'
import { getOrgRepos, getUserRepos } from '@/api/repos'
import type { Option } from '@/types/repo'
import UserLogo from '@/assets/profile.jpg'
import SearchIcon from '@/assets/search.svg'
import styles from './RepoListPage.module.scss'

export function RepoListPage() {
  const options: Option[] = [
    { key: 'organization', value: 'Organization' },
    { key: 'user', value: 'User' },
  ]

  const [searchParams, setSearchParams] = useSearchParams()

  const [selected, setSelected] = useState(searchParams.get('type') || '')
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setError] = useState<string | null>(null)

  const fetchRepos = async (
    p: number = page,
    q: string = query,
    t: string = selected
  ) => {
    if (!q || !t) return

    setLoading(true)
    setError(null)

    try {
      let data = []
      if (t === 'organization') data = await getOrgRepos(q, p)
      else if (t === 'user') data = await getUserRepos(q, p)
      setRepos(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query && selected) {
      fetchRepos(page)
    }
  }, [])

  useEffect(() => {
    if (!query || !selected) return
    fetchRepos(page)
    setSearchParams({ type: selected, query, page: String(page) })
  }, [page])

  const handleSearch = () => {
    if (!query || !selected) return
    setPage(1)
    fetchRepos(1, query, selected)
    setSearchParams({ type: selected, query, page: '1' })
  }

  return (
    <div>
      <Header logoUrl={UserLogo} />
      <main className={styles['repo-list']}>
        <div className={styles['repo-list__inner']}>
          <Text tag="h2" className={styles['repo-list__title']}>
            List of organization repositories
          </Text>
          <div className={styles['repo-list__search-section']}>
            <Dropdown
              options={options}
              value={selected}
              placeholder="Type"
              onChange={setSelected}
              className={styles['repo-list__search-dropdown']}
            />
            <div className={styles['repo-list__search']}>
              <Input
                value={query}
                placeholder="Enter organization name"
                onChange={setQuery}
                containerClassName={styles['repo-list__search-input']}
              />
              <Button onClick={handleSearch}>
                <img src={SearchIcon} alt="search icon" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className={styles['repo-list__loader']}>
              <Loader />
            </div>
          ) : (
            <RepoList
              defaultText={
                errorMessage
                  ? errorMessage
                  : 'Search for a repository or organization to get started'
              }
              repos={repos}
            />
          )}

          {!loading && repos.length > 0 && (
            <Paginator currentPage={page} onPageChange={setPage} />
          )}
        </div>
      </main>
    </div>
  )
}
