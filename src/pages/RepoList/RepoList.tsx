import Header from '@/components/Header/Header'
import Text from '@/components/Text'
import styles from './RepoList.module.scss'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button/Button'
import type { Option } from '@/components/MultiDropdown'
import { Dropdown } from '@/components/Dropdown/Dropdown'

export function RepoList() {
  const options: Option[] = [
    { key: 'organization', value: 'Organization' },
    { key: 'user', value: 'User' },
  ]

  const [selected, setSelected] = useState<string>('')

  return (
    <>
      <Header logoUrl="/profile.jpg" />
      <main className={styles.main}>
        <div className={styles.inner}>
          <Text tag="h2" className={styles.title}>
            List of organization repositories
          </Text>
          <div>
            <Dropdown
              options={options}
              value={selected}
              placeholder="Type"
              onChange={setSelected}
              className={styles.searchDropdown}
            />
            <div className={styles.search}>
              <Input
                value=""
                placeholder="Enter organization name"
                onChange={() => {}}
                containerClassName={styles.searchInput}
              />
              <Button>
                <img src="/search.svg" alt="search icon" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
