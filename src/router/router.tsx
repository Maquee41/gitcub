import type { JSX } from 'react'
import { createBrowserRouter } from 'react-router'
import withRepoDetailsProvider from '@/hoks/withRepoDetailsProvider'
import { RepoListPage } from '@/pages/RepoListPage/RepoListPage'
import { RepoDetailsPage } from '@/pages/RepoDetailsPage/RepoDetailsPage'
import withRepoListProvider from '@/hoks/withRepoListProvider'

interface RouteItem {
  path: string
  element: JSX.Element
}

const RepoDetailsPageWithProvider = withRepoDetailsProvider(RepoDetailsPage)
const RepoListPageWithProvider = withRepoListProvider(RepoListPage)

const ROUTER: RouteItem[] = [
  {
    path: '/',
    element: <RepoListPageWithProvider />,
  },
  {
    path: '/repo/:owner/:repoName',
    element: <RepoDetailsPageWithProvider />,
  },
]

export const router = createBrowserRouter(ROUTER)
