import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'
import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import throttledFetchAudioFeatures from './throttledFetchAudioFeatures'
export default async function updateAudioFeatures(
  trackArray: PlaylistTrackObject[] | SavedTracksObject[],
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  accessToken: string | undefined,
  currPageIndex?: number,
  totalPage?: number,
): Promise<Record<string, number | AudioFeaturesObject> | undefined> {
  console.log(accessToken)
  if (accessToken === undefined || accessToken === '') {
    return
  }
  try {
    const newAudioFeatures = audioFeatures

    trackArray.forEach((track) => {
      const trackId = track?.track?.id
      if (trackId === undefined || trackId === null) {
        return
      }
      if (!(trackId in newAudioFeatures)) {
        newAudioFeatures[trackId] = 0
      }
    })
    const res = await throttledFetchAudioFeatures(
      newAudioFeatures,
      accessToken,
      currPageIndex,
      totalPage,
    )
    if (res !== null) {
      return res
    }
    return newAudioFeatures
  } catch (error) {
    console.log(error)
  }
}
