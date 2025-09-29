export interface RepoOwnerApi {
  id: number
  avatar_url: string
  html_url: string
  login: string
  url: string
}

export interface RepoOwnerModel {
  id: number
  avatarUrl: string
  htmlUrl: string
  login: string
  url: string
}

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
  id: from.id,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
  login: from.login,
  url: from.url,
})
