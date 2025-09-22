import { makeAutoObservable } from 'mobx'
import type { FavouriteRepo } from './FavouriteRepo'

class FavouriteStore {
  favourites: FavouriteRepo[] = []

  constructor() {
    makeAutoObservable(this)

    const saved = localStorage.getItem('favourites')
    if (saved) {
      try {
        this.favourites = JSON.parse(saved)
      } catch {
        this.favourites = []
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('favourites', JSON.stringify(this.favourites))
  }

  add(repo: FavouriteRepo) {
    if (!this.favourites.find((r) => r.repoName === repo.repoName)) {
      this.favourites.push(repo)
      this.saveToStorage()
    }
  }

  remove(repoName: string) {
    this.favourites = this.favourites.filter((r) => r.repoName !== repoName)
    this.saveToStorage()
  }

  toggle(repo: FavouriteRepo) {
    if (this.isFavourite(repo.repoName)) {
      this.remove(repo.repoName)
    } else {
      this.add(repo)
    }
  }

  clear() {
    this.favourites = []
    this.saveToStorage()
  }

  get favouriteCount() {
    return this.favourites.length
  }

  isFavourite(repoName: string) {
    return this.favourites.some((r) => r.repoName === repoName)
  }
}

export const favouriteStore = new FavouriteStore()
