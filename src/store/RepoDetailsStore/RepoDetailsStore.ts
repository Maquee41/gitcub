import { makeAutoObservable, runInAction } from 'mobx'
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
  repo: RepoDetailsType | null = null

  contributors: unknown[] = []
  languages: LanguageType[] = []
  readmeHtml: string = ''
  meta: MetaState = MetaState.Initial
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchRepo = async (owner: string, repoName: string) => {
    this.meta = MetaState.Loading
    this.error = null

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
        this.repo = repoData
        this.contributors = contributorsData
        this.languages = formattedLanguages
        this.readmeHtml = readmeData
        this.meta = MetaState.Success
      })
    } catch (err) {
      console.error(err)
      runInAction(() => {
        this.error = 'Failed to load repository details'
        this.meta = MetaState.Error
      })
    }
  }

  reset = () => {
    this.repo = null
    this.contributors = []
    this.languages = []
    this.readmeHtml = ''
    this.error = null
    this.meta = MetaState.Initial
  }
}
