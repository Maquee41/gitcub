import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.scss'
import { RepoListPage } from '@/pages/RepoListPage/RepoListPage'
import { RepoDetails } from '@/pages/RepoDetails/RepoDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RepoListPage />,
  },
  {
    path: '/repo/:owner/:repoName',
    element: <RepoDetails />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
