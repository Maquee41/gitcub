import { action, computed, makeAutoObservable, runInAction } from 'mobx'
import {
  getRepoDetails,
  getRepoContributors,
  getRepoLanguages,
  getRepoReadme,
} from '@/api/reposDetailed'

import { MetaState } from '@/types/metaState'
import {
  normalizeRepoItem,
  type RepoItemApi,
  type RepoItemModel,
} from '../models/GitHub'
import {
  parseLanguageApiResponse,
  type LanguageItemModel,
} from '../models/GitHub/languageItem'
import {
  normalizeContributorItem,
  type ContributorItemApi,
  type ContributorItemModel,
} from '../models/GitHub/contributorItem'

export class RepoDetailsStore {
  private _repo: RepoItemModel | null = null
  private _contributors: ContributorItemModel[] = []
  private _languages: LanguageItemModel[] = []
  private _readmeHtml: string = ''
  private _meta: MetaState = MetaState.Initial
  private _error: string | null = null

  constructor() {
    makeAutoObservable(this, {
      repo: computed,
      contributors: computed,
      languages: computed,
      readmeHtml: computed,
      meta: computed,
      error: computed,

      fetchRepo: action.bound,
      reset: action.bound,
    })
  }

  get repo(): RepoItemModel | null {
    return this._repo
  }

  get contributors(): ContributorItemModel[] {
    return this._contributors
  }

  get languages(): LanguageItemModel[] {
    return this._languages
  }

  get readmeHtml(): string {
    return this._readmeHtml
  }

  get meta(): MetaState {
    return this._meta
  }

  get error(): string | null {
    return this._error
  }

  fetchRepo = async (owner: string, repoName: string) => {
    this._meta = MetaState.Loading
    this._error = null

    try {
      const repoData: RepoItemApi = await getRepoDetails(owner, repoName)
      const contributorsData: ContributorItemApi[] = await getRepoContributors(
        owner,
        repoName
      )
      const languagesData = await getRepoLanguages(owner, repoName)
      const readmeData = await getRepoReadme(owner, repoName)

      const normalizedRepoData: RepoItemModel = normalizeRepoItem(repoData)
      const normalizedContributorsData: ContributorItemModel[] =
        contributorsData.map(normalizeContributorItem)
      const normalizedLanguagesData: LanguageItemModel[] =
        parseLanguageApiResponse(languagesData)

      runInAction(() => {
        this._repo = normalizedRepoData
        this._contributors = normalizedContributorsData
        this._languages = normalizedLanguagesData
        this._readmeHtml = readmeData
        this._meta = MetaState.Success
      })
    } catch (err) {
      console.error(err)
      runInAction(() => {
        this._error = 'Failed to load repository details'
        this._meta = MetaState.Error
      })
    }
  }

  reset = () => {
    this._repo = null
    this._contributors = []
    this._languages = []
    this._readmeHtml = ''
    this._error = null
    this._meta = MetaState.Initial
  }
}
