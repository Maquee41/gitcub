import { createContext, useContext, type ReactNode } from 'react'
import { RepoDetailsStore } from './RepoDetailsStore'

const RepoDetailsStoreContext = createContext<RepoDetailsStore | null>(null)

interface RepoDetailsStoreProviderProps {
  children: ReactNode
}

export const RepoDetailsStoreProvider = ({
  children,
}: RepoDetailsStoreProviderProps) => {
  const store = new RepoDetailsStore()

  return (
    <RepoDetailsStoreContext.Provider value={store}>
      {children}
    </RepoDetailsStoreContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRepoDetailsStore = (): RepoDetailsStore => {
  const store = useContext(RepoDetailsStoreContext)

  if (!store) {
    throw new Error(
      'useRepoDetailsStore must be used within a RepoDetailsStoreProvider'
    )
  }

  return store
}
