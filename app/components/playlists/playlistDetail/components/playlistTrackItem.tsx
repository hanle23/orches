import React from 'react'
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import MediaPreviewButton from '../../../../components/mediaPreviewButton'
import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'

export default function PlaylistTrackItem({
  index,
  track,
  handleRemoveTrack,
  style,
  trackUrl,
  setTrackUrl,
}: {
  index: number
  track: PlaylistTrackObject
  handleRemoveTrack: (trackUri: string) => Promise<void>
  style: React.CSSProperties | undefined
  trackUrl: string
  setTrackUrl: (url: string) => void
}): React.JSX.Element {
  const smallestImage = track?.track?.album?.images?.reduce((minImg, img) =>
    img?.width * img?.height < minImg?.width * minImg?.height ? img : minImg,
  )
  return track?.track !== null ? (
    <div
      className="group grid grid-cols-12 gap-4 border relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
      style={style}
    >
      <div className="col-span-1 flex justify-end text-spotify-subtext items-center">
        <MediaPreviewButton
          className="group-hover:block"
          currTrackUrl={track.track.preview_url}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />

        <p className="mr-2 group-hover:hidden">{index + 1}</p>
      </div>
      <div className="col-span-6 lg:col-span-4 flex  items-center align-middle space-x-3">
        <div className="flex shrink-0 h-12 w-12">
          <Image
            src={smallestImage?.url}
            alt=""
            width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
            height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
            className="w-auto h-auto rounded-md"
          />
        </div>
        <div className="grid">
          <a
            href={track?.track?.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate"
          >
            {track?.track?.name}
          </a>
          <span className="truncate text-sm text-spotify-subtext">
            {track?.track?.artists.map((artist, index) => (
              <React.Fragment key={artist.id}>
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {artist.name}
                </a>{' '}
                {index < track?.track?.artists.length - 1 && ', '}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
      <div className="col-span-3">
        <p className="truncate items-center text-spotify-subtext text-sm text-left h-full w-full flex">
          {track?.track?.album.name}
        </p>
      </div>
      <div className="hidden lg:flex lg:col-span-2">
        <div className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {new Date(track?.added_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-around">
        <button
          className="group-hover:block hidden truncate text-sm hover:text-danger-color"
          onClick={() => {
            handleRemoveTrack(track?.track?.uri).catch((e) => {
              console.log(e)
            })
          }}
        >
          <RemoveCircleOutlineIcon />
        </button>
        <div className="truncate items-center text-spotify-subtext text-sm justify-center flex">
          {Math.floor(track?.track?.duration_ms / 60000)}:
          {((track?.track?.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </div>
        <button className="group-hover:block hidden truncate text-sm h-fit w-fit hover:text-spotify-color">
          <MoreHorizIcon />
        </button>
      </div>
    </div>
  ) : (
    <></>
  )
}
