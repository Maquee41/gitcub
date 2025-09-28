import { languageColors } from '@/pages/RepoDetailsPage/values'

export const getLanguageColor = (name: string) => {
  return languageColors[name] || '#bebebe'
}
