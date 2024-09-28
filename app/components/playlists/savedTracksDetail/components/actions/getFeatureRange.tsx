import type { PlaylistSummary } from '@/app/types/spotify/playlist'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import { FEATURE_SETTINGS } from '@/constants/spotify/audioFeatures'
import sortFunction from '../helpers/sortFunction'
import createIntervalArray from '../helpers/createIntervalArray'
type AudioFeatureType = keyof AudioFeaturesObject

export default function getFeatureRange(
  playlist: PlaylistSummary,
  type: AudioFeatureType,
): number[][] | null {
  const audioFeatures = playlist.tracksFeatures
  if (audioFeatures === null || audioFeatures === undefined) {
    return null
  }
  const max = FEATURE_SETTINGS[type]?.max ?? 0
  const min = FEATURE_SETTINGS[type]?.min ?? 0
  const factorOfMargin = FEATURE_SETTINGS[type]?.factorOfMargin ?? 1
  const errorMargin = factorOfMargin !== 1 ? (max - min) / factorOfMargin : 0
  const audioFeatureInterval = createIntervalArray(
    audioFeatures,
    type,
    errorMargin,
  )
  audioFeatureInterval.sort(sortFunction)
  const merged: number[][] = []
  for (const interval of audioFeatureInterval) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval)
    } else {
      merged[merged.length - 1][1] = Math.max(
        interval[1],
        merged[merged.length - 1][1],
      )
    }
  }

  return merged
}
