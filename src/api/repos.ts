import { baseClient } from './baseClient'

export const getOrgRepos = async (org: string, page = 1, perPage = 10) => {
  const response = await baseClient.get(`/orgs/${org}/repos`, {
    params: { page, per_page: perPage },
  })
  return response.data
}

export const getUserRepos = async (
  username: string,
  page = 1,
  perPage = 10
) => {
  const response = await baseClient.get(`/users/${username}/repos`, {
    params: { page, per_page: perPage },
  })
  return response.data
}
