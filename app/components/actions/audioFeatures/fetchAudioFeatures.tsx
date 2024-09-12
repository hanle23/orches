import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import fetchFunction from '@/app/components/actions/helper/fetchFunction'

export default async function fetchAudioFeatures(
  tracksToFetch: string[],
  accessToken: string,
): Promise<{ audio_features: AudioFeaturesObject[] }> {
  if (tracksToFetch.length > 100) {
    throw new Error('Track limit exceeded (100 tracks)')
  }
  const tracksString = `ids=${tracksToFetch.join(',')}`
  const url = `https://api.spotify.com/v1/audio-features?${tracksString}`
  const response = await fetchFunction({
    url,
    token: accessToken,
  })
  return response as { audio_features: AudioFeaturesObject[] }
}
