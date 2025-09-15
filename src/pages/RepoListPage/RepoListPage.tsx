import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import Input from '@/components/Input'
import Button from '@/components/Button/Button'
import { Dropdown } from '@/components/Dropdown/Dropdown'
import { RepoList } from './components/RepoList/RepoList'
import Pagination from './components/Pagination/Pagination'
import Loader from '@/components/Loader/Loader'
import { getOrgRepos, getUserRepos } from '@/api/repos'
import type { Option } from '@/types/repo'
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
    <>
      <Header logoUrl="/profile.jpg" />
      <main className={styles.main}>
        <div className={styles.inner}>
          <Text tag="h2" className={styles.title}>
            List of organization repositories
          </Text>
          <div className={styles.searchSection}>
            <Dropdown
              options={options}
              value={selected}
              placeholder="Type"
              onChange={setSelected}
              className={styles.searchDropdown}
            />
            <div className={styles.search}>
              <Input
                value={query}
                placeholder="Enter organization name"
                onChange={setQuery}
                containerClassName={styles.searchInput}
              />
              <Button onClick={handleSearch}>
                <img src="/search.svg" alt="search icon" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className={styles.loader}>
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
            <Pagination currentPage={page} onPageChange={setPage} />
          )}
        </div>
      </main>
    </>
  )
}
