export default function IsExistInPlaylist(
  playlistId: string,
  distinctTracksInPlaylist: Record<string, string[]>,
  currTrackId: string,
  playlistsToAdd: string[],
  playlistsToRemove: string[],
): boolean {
  const trackInPlaylist =
    distinctTracksInPlaylist[currTrackId]?.includes(playlistId)

  if (trackInPlaylist) {
    return !playlistsToRemove.includes(playlistId)
  } else {
    return playlistsToAdd.includes(playlistId)
  }
}
