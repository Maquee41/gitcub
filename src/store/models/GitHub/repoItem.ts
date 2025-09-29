import {
  normalizeRepoOwner,
  type RepoOwnerApi,
  type RepoOwnerModel,
} from './repoOwner'

export interface RepoItemApi {
  id: number
  name: string
  full_name: string
  description: string
  archived: boolean
  forks_count: number
  stargazers_count: number
  watchers_count: number
  owner: RepoOwnerApi
  topics: string[]
  html_url: string
  created_at: string
  updated_at: string
  ssh_url: string
  clone_url: string
}

export interface RepoItemModel {
  id: number
  name: string
  fullName: string
  description: string
  archived: boolean
  forksCount: number
  stargazersCount: number
  watchersCount: number
  owner: RepoOwnerModel
  topics: string[]
  htmlUrl: string
  createdAt: Date
  updatedAt: Date
  sshUrl: string
  cloneUrl: string
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  fullName: from.full_name,
  description: from.description,
  archived: from.archived,
  forksCount: from.forks_count,
  stargazersCount: from.stargazers_count,
  watchersCount: from.watchers_count,
  owner: normalizeRepoOwner(from.owner),
  topics: from.topics,
  htmlUrl: from.html_url,
  createdAt: new Date(from.created_at),
  updatedAt: new Date(from.updated_at),
  sshUrl: from.ssh_url,
  cloneUrl: from.clone_url,
})
