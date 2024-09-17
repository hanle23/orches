'use client'
import React, { useCallback } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

export default function MediaPreviewButton({
  className,
  currTrackUrl,
  trackUrl,
  setTrackUrl,
}: {
  className?: string
  currTrackUrl: string
  trackUrl: string
  setTrackUrl: (url: string) => void
}): JSX.Element {
  const handleSetTrack = useCallback(() => {
    if (trackUrl === currTrackUrl) {
      setTrackUrl('')
    } else {
      setTrackUrl(currTrackUrl)
    }
  }, [trackUrl, currTrackUrl, setTrackUrl])

  const handlePlayPause = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== '') {
        return
      }
      if (trackUrl === currTrackUrl) {
        setTrackUrl('')
      } else {
        setTrackUrl(currTrackUrl)
      }
    },
    [trackUrl, currTrackUrl, setTrackUrl],
  )

  return (
    <button
      tabIndex={0}
      onKeyDown={handlePlayPause}
      onClick={handleSetTrack}
      className={`${className ?? ''} hidden hover:text-spotify-color`}
    >
      {trackUrl === currTrackUrl ? <StopIcon /> : <PlayArrowIcon />}
    </button>
  )
}
