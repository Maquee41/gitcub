import { getOrgRepos, getUserRepos } from '@/api/repos'
import { action, computed, makeAutoObservable, runInAction } from 'mobx'
import { MetaState } from '@/types/metaState'
import {
  normalizeRepoItem,
  type RepoItemApi,
  type RepoItemModel,
} from '../models/GitHub'

export class RepoListStore {
  private _selected: string = ''
  private _query: string = ''
  private _page: number = 1
  private _repos: RepoItemModel[] = []
  private _meta: MetaState = MetaState.Initial
  private _errorMessage: string | null = null

  constructor() {
    makeAutoObservable(this, {
      selected: computed,
      query: computed,
      page: computed,
      repos: computed,
      meta: computed,
      errorMessage: computed,

      setSelected: action.bound,
      setQuery: action.bound,
      setPage: action.bound,
      handleSearch: action.bound,
    })
  }

  get selected(): string {
    return this._selected
  }

  get query(): string {
    return this._query
  }

  get page(): number {
    return this._page
  }

  get repos(): RepoItemModel[] {
    return this._repos
  }

  get meta(): MetaState {
    return this._meta
  }

  get errorMessage(): string | null {
    return this._errorMessage
  }

  public setSelected = (value: string) => {
    this._selected = value
  }

  public setQuery = (value: string) => {
    this._query = value
  }

  public setPage = (value: number) => {
    this._page = value
  }

  fetchRepos = async (
    p: number = this._page,
    q: string = this._query,
    t: string = this._selected
  ) => {
    if (!q || !t) return

    this._meta = MetaState.Loading
    this._errorMessage = null

    try {
      let data: RepoItemApi[] = []
      if (t === 'organization') {
        data = await getOrgRepos(q, p)
      } else if (t === 'user') {
        data = await getUserRepos(q, p)
      }

      const normalizedData: RepoItemModel[] = data.map(normalizeRepoItem)

      runInAction(() => {
        this._repos = normalizedData
        this._meta = MetaState.Success
      })
    } catch (err) {
      console.error(err)
      runInAction(() => {
        this._errorMessage = 'Failed to fetch repositories'
        this._meta = MetaState.Error
      })
    }
  }

  handleSearch = () => {
    if (!this._query || !this._selected) return
    this.setPage(1)
    this.fetchRepos(1, this._query, this._selected)
  }
}
