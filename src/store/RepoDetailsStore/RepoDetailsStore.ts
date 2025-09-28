import { action, computed, makeAutoObservable, runInAction } from 'mobx'
import {
  getRepoDetails,
  getRepoContributors,
  getRepoLanguages,
  getRepoReadme,
} from '@/api/reposDetailed'
import type { LanguageType, RepoDetailsType } from '../RepoListStore/repo'
import { languageColors } from '@/pages/RepoDetailsPage/values'
import { MetaState } from '@/types/metaState'

function getLanguageColor(name: string) {
  return languageColors[name] || '#ededed'
}

export class RepoDetailsStore {
  private _repo: RepoDetailsType | null = null
  private _contributors: unknown[] = []
  private _languages: LanguageType[] = []
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

  get repo(): RepoDetailsType | null {
    return this._repo
  }

  get contributors(): unknown[] {
    return this._contributors
  }

  get languages(): LanguageType[] {
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
      const repoData = await getRepoDetails(owner, repoName)
      const contributorsData = await getRepoContributors(owner, repoName)
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

      const readmeData = await getRepoReadme(owner, repoName)

      runInAction(() => {
        this._repo = repoData
        this._contributors = contributorsData
        this._languages = formattedLanguages
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
