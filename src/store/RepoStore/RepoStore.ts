import { getOrgRepos, getUserRepos } from '@/api/repos'
import { makeAutoObservable, runInAction } from 'mobx'
import type { RepoDetailsType } from './repo'

class RepoStore {
  selected: string = ''
  query: string = ''
  page: number = 1
  repos: RepoDetailsType[] = []
  loading: boolean = false
  errorMessage: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setSelected = (value: string) => {
    this.selected = value
  }

  setQuery = (value: string) => {
    this.query = value
  }

  setPage = (value: number) => {
    this.page = value
  }

  fetchRepos = async (
    p: number = this.page,
    q: string = this.query,
    t: string = this.selected
  ) => {
    if (!q || !t) return

    this.loading = true
    this.errorMessage = null

    try {
      let data: any[] = []
      if (t === 'organization') {
        data = await getOrgRepos(q, p)
      } else if (t === 'user') {
        data = await getUserRepos(q, p)
      }

      runInAction(() => {
        this.repos = data
      })
    } catch (err) {
      console.error(err)
      runInAction(() => {
        this.errorMessage = 'Failed to fetch repositories'
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  handleSearch = () => {
    if (!this.query || !this.selected) return
    this.setPage(1)
    this.fetchRepos(1, this.query, this.selected)
  }
}

export const repoStore = new RepoStore()
