import { RepoDetailsStoreProvider } from '@/store/RepoDetailsStore'

const withRepoDetailsProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function Wrapped(props: P) {
    return (
      <RepoDetailsStoreProvider>
        <Component {...props} />
      </RepoDetailsStoreProvider>
    )
  }
}

export default withRepoDetailsProvider
