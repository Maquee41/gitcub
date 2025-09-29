import { action, computed, makeAutoObservable } from 'mobx'
import type { FavouriteRepo } from './FavouriteRepo'

class FavouriteStore {
  private _favourites: FavouriteRepo[] = []

  constructor() {
    makeAutoObservable(this, {
      favourites: computed,
      favouriteCount: computed,

      add: action.bound,
      remove: action.bound,
      toggle: action.bound,
      clear: action.bound,
    })

    const saved = localStorage.getItem('favourites')
    if (saved) {
      try {
        this._favourites = JSON.parse(saved)
      } catch {
        this._favourites = []
      }
    }
  }

  get favourites(): FavouriteRepo[] {
    return this._favourites
  }

  private saveToStorage() {
    localStorage.setItem('favourites', JSON.stringify(this._favourites))
  }

  add(repo: FavouriteRepo) {
    if (!this._favourites.find((r) => r.repoName === repo.repoName)) {
      this._favourites.push(repo)
      this.saveToStorage()
    }
  }

  remove(repoName: string) {
    this._favourites = this._favourites.filter((r) => r.repoName !== repoName)
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
    this._favourites = []
    this.saveToStorage()
  }

  get favouriteCount() {
    return this._favourites.length
  }

  isFavourite(repoName: string) {
    return this._favourites.some((r) => r.repoName === repoName)
  }
}

export const favouriteStore = new FavouriteStore()
