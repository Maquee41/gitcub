import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { RepoList } from '@/pages/RepoList/RepoList'
import './index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RepoList />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
