import { getOrgRepos, getUserRepos } from '@/api/repos'
import { makeAutoObservable, runInAction } from 'mobx'
import type { RepoDetailsType } from './repo'
import { MetaState } from '@/types/metaState'

export class RepoListStore {
  selected: string = ''
  query: string = ''
  page: number = 1
  repos: RepoDetailsType[] = []
  meta: MetaState = MetaState.Initial
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

    this.meta = MetaState.Loading
    this.errorMessage = null

    try {
      let data: RepoDetailsType[] = []
      if (t === 'organization') {
        data = await getOrgRepos(q, p)
      } else if (t === 'user') {
        data = await getUserRepos(q, p)
      }

      runInAction(() => {
        this.repos = data
        this.meta = MetaState.Success
      })
    } catch (err) {
      console.error(err)
      runInAction(() => {
        this.errorMessage = 'Failed to fetch repositories'
        this.meta = MetaState.Error
      })
    }
  }

  handleSearch = () => {
    if (!this.query || !this.selected) return
    this.setPage(1)
    this.fetchRepos(1, this.query, this.selected)
  }
}
