import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
type AudioFeatureType = keyof AudioFeaturesObject
export default function createIntervalArray(
  audioFeatures: AudioFeaturesObject[],
  type: AudioFeatureType,
  errorMargin: number,
): number[][] {
  const result: number[][] = []
  for (let index = 0; index < audioFeatures.length; index++) {
    const lowerRange = (audioFeatures[index][type] as number) - errorMargin
    const upperRange = (audioFeatures[index][type] as number) + errorMargin
    result.push([lowerRange, upperRange])
  }
  return result
}
