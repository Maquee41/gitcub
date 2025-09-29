import { getLanguageColor } from '@/utils/languageColors'

export interface LanguageItemApi {
  name: string
  bytes: number
}

export interface LanguageItemModel {
  name: string
  color: string
  percentage: number | string
}

export const normalizeLanguageItemModel = (
  from: LanguageItemApi,
  totalBytes: number
): LanguageItemModel => ({
  name: from.name,
  color: getLanguageColor(from.name),
  percentage: totalBytes > 0 ? ((from.bytes / totalBytes) * 100).toFixed(2) : 0,
})

export const parseLanguageApiResponse = (
  apiResponse: Record<string, number>
): LanguageItemModel[] => {
  const items: LanguageItemApi[] = Object.entries(apiResponse).map(
    ([name, bytes]) => ({
      name,
      bytes,
    })
  )

  const totalBytes = items.reduce((sum, item) => sum + item.bytes, 0)

  return items.map((item) => normalizeLanguageItemModel(item, totalBytes))
}
