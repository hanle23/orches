import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import fetchAudioFeatures from './fetchAudioFeatures'

export default async function queueAudioFeatures(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  accessToken: string,
): Promise<{
  data: Record<string, number | AudioFeaturesObject>
  total: number
} | null> {
  const newAudioFeatures = audioFeatures

  const tracksToFetch: string[] = []
  let total = 0
  Object.keys(audioFeatures).forEach((trackId) => {
    if (newAudioFeatures[trackId] === 0 && tracksToFetch.length + 1 <= 100) {
      tracksToFetch.push(trackId)
    }
  })
  if (tracksToFetch.length > 0) {
    const fetchedAudioFeatures = await fetchAudioFeatures(
      tracksToFetch,
      accessToken,
    )
    if (fetchedAudioFeatures.audio_features.length === 0) {
      return null
    }
    fetchedAudioFeatures.audio_features.forEach(
      (audioFeature: AudioFeaturesObject) => {
        newAudioFeatures[audioFeature.id] = audioFeature
        total += 1
      },
    )
  } else {
    return null
  }

  return { data: newAudioFeatures, total }
}
