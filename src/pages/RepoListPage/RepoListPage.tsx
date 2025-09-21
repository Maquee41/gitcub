import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { observer } from 'mobx-react-lite'

import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import Input from '@/components/Input'
import Button from '@/components/Button/Button'
import Dropdown from '@/components/Dropdown/Dropdown'
import RepoList from './components/RepoList/RepoList'
import Paginator from '@/components/Paginator'
import Loader from '@/components/Loader/Loader'

import { repoStore } from '@/store/RepoStore/RepoStore'
import type { Option } from '@/types/repo'

import UserLogo from '@/assets/profile.jpg'
import SearchIcon from '@/assets/search.svg'
import styles from './RepoListPage.module.scss'

export const RepoListPage = observer(() => {
  const options: Option[] = [
    { key: 'organization', value: 'Organization' },
    { key: 'user', value: 'User' },
  ]

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const selected = searchParams.get('type') || ''
    const query = searchParams.get('query') || ''
    const page = Number(searchParams.get('page')) || 1

    repoStore.setSelected(selected)
    repoStore.setQuery(query)
    repoStore.setPage(page)

    if (query && selected) {
      repoStore.fetchRepos(page, query, selected)
    }
  }, [])

  useEffect(() => {
    if (!repoStore.query || !repoStore.selected) return
    repoStore.fetchRepos(repoStore.page)
    setSearchParams({
      type: repoStore.selected,
      query: repoStore.query,
      page: String(repoStore.page),
    })
  }, [repoStore.page])

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
              value={repoStore.selected}
              placeholder="Type"
              onChange={repoStore.setSelected}
              className={styles['repo-list__search-dropdown']}
            />
            <div className={styles['repo-list__search']}>
              <Input
                value={repoStore.query}
                placeholder="Enter organization name"
                onChange={repoStore.setQuery}
                containerClassName={styles['repo-list__search-input']}
              />
              <Button onClick={repoStore.handleSearch}>
                <img src={SearchIcon} alt="search icon" />
              </Button>
            </div>
          </div>

          {repoStore.loading ? (
            <div className={styles['repo-list__loader']}>
              <Loader />
            </div>
          ) : (
            <RepoList
              defaultText={
                repoStore.errorMessage
                  ? repoStore.errorMessage
                  : 'Search for a repository or organization to get started'
              }
              repos={repoStore.repos}
            />
          )}

          {!repoStore.loading && repoStore.repos.length > 0 && (
            <Paginator
              currentPage={repoStore.page}
              onPageChange={repoStore.setPage}
            />
          )}
        </div>
      </main>
    </div>
  )
})
