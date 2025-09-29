export interface ContributorItemApi {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface ContributorItemModel {
  id: number
  login: string
  avatarUrl: string
  htmlUrl: string
  contributions: number
}

export const normalizeContributorItem = (
  from: ContributorItemApi
): ContributorItemModel => ({
  id: from.id,
  login: from.login,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
  contributions: from.contributions,
})
