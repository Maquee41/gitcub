import { baseClient } from './baseClient'

export const getRepoDetails = async (owner: string, repoName: string) => {
  const response = await baseClient.get(`/repos/${owner}/${repoName}`)
  return response.data
}

export const getRepoContributors = async (
  owner: string,
  repoName: string,
  per_page: number = 10
) => {
  const response = await baseClient.get(
    `/repos/${owner}/${repoName}/contributors`,
    {
      params: { per_page: per_page },
    }
  )
  return response.data
}

export const getRepoLanguages = async (owner: string, repoName: string) => {
  const response = await baseClient.get(`/repos/${owner}/${repoName}/languages`)
  return response.data
}

export const getRepoReadme = async (owner: string, repoName: string) => {
  const response = await baseClient.get(`/repos/${owner}/${repoName}/readme`, {
    headers: {
      Accept: 'application/vnd.github.html+json',
    },
  })
  return response.data
}
