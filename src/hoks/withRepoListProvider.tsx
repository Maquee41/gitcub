import { RepoListStoreProvider } from '@/store/RepoListStore'

const withRepoListProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function Wrapped(props: P) {
    return (
      <RepoListStoreProvider>
        <Component {...props} />
      </RepoListStoreProvider>
    )
  }
}

export default withRepoListProvider
