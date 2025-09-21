import type { JSX } from 'react'
import { RepoDetails } from '@/pages/RepoDetails/RepoDetails'
import { RepoListPage } from '@/pages/RepoListPage/RepoListPage'
import { createBrowserRouter } from 'react-router'

interface RouteItem {
  path: string
  element: JSX.Element
}

const ROUTER: RouteItem[] = [
  {
    path: '/',
    element: <RepoListPage />,
  },
  {
    path: '/repo/:owner/:repoName',
    element: <RepoDetails />,
  },
]

export const router = createBrowserRouter(ROUTER)
