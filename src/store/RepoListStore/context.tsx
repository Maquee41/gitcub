import { createContext, useContext, type ReactNode } from 'react'
import { RepoListStore } from './RepoListStore'

const RepoDetailsStoreContext = createContext<RepoListStore | null>(null)

interface RepoListStoreProviderProps {
  children: ReactNode
}

export const RepoListStoreProvider = ({
  children,
}: RepoListStoreProviderProps) => {
  const store = new RepoListStore()

  return (
    <RepoDetailsStoreContext.Provider value={store}>
      {children}
    </RepoDetailsStoreContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRepoListStore = (): RepoListStore => {
  const store = useContext(RepoDetailsStoreContext)

  if (!store) {
    throw new Error(
      'useRepoListStore must be used within a RepoListStoreProvider'
    )
  }

  return store
}
