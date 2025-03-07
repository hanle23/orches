import React from 'react'
import PlaylistCard from './sidebarComponents/playlistCard'
import type {
  SimplifiedPlaylistObject,
  PlaylistSummary,
} from '@/app/types/spotify/playlist'

export default function SideBar({
  className,
  playlists,
  currPlaylist,
  setCurrPlaylist,
}: {
  className?: string
  currPlaylist: SimplifiedPlaylistObject | null
  setCurrPlaylist: (id: string) => void
  playlists: PlaylistSummary[]
}): React.JSX.Element {
  return (
    <div
      className={
        className ??
        'flex flex-col gap-6 w-fit h-full relative shrink-0 overflow-hidden'
      }
    >
      <div
        className={`flex ${playlists.length === 0 ? 'items-center' : 'flex-col'} rounded-lg bg-container h-full p-2.5 overflow-x-hidden overflow-y-auto shrink-0 min-w-36`}
      >
        {playlists.length > 0 ? (
          playlists?.map((playlist: PlaylistSummary, index: number) => (
            <PlaylistCard
              key={playlist.id}
              index={index}
              playlist={playlist}
              setCurrPlaylist={setCurrPlaylist}
              currPlaylist={currPlaylist}
            />
          ))
        ) : (
          <p className="px-[8.75rem]">Loading . . .</p>
        )}
      </div>
    </div>
  )
}
