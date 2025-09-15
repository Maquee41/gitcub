export type Option = {
  key: string
  value: string
}

export interface LanguageType {
  name: string
  color: string
  percentage: number
}

export interface RepoDetailsType {
  name: string
  full_name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  topics: string[]
  html_url: string
  updated_at: string
}
