import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
type AudioFeatureType = keyof AudioFeaturesObject
export default function createIntervalArray(
  audioFeatures: AudioFeaturesObject[],
  type: AudioFeatureType,
  errorMargin: number,
): number[][] {
  const result: number[][] = []
  for (const interval of audioFeatures) {
    const lowerRange = (interval[type] as number) - errorMargin
    const upperRange = (interval[type] as number) + errorMargin
    result.push([lowerRange, upperRange])
  }
  return result
}
