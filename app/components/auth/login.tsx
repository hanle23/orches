'use client'
import { signIn } from 'next-auth/react'
import SpotifyLogo from '@/public/png/Spotify_Primary_Logo_RGB_Green.png'
import Image from 'next/image'
export default function Login(): React.JSX.Element {
  return (
    <div className="flex justify-center items-center h-full w-full bg-spotify-item-background">
      <div className="flex flex-col shrink-0 h-fit w-fit px-5 py-5 gap-5 text-center items-center bg-container rounded-md overflow-hidden">
        <h1 className="font-semibold text-3xl text-white truncate">
          Log in to Orches
        </h1>
        <button
          className="flex rounded-full w-fit border-spotify-subtext border gap-5 px-9 py-3"
          onClick={() => {
            signIn('spotify').catch((error) => {
              console.error(error)
            })
          }}
        >
          <Image
            src={SpotifyLogo}
            alt="Spotify Logo"
            width={30}
            height={30}
            className="shrink-0 max-w-[30px] max-h-[30px]"
          />
          <p className="text-lg font-semibold text-white truncate">
            Continue with Spotify
          </p>
        </button>
        <p className="text-white text-xs">
          The application is currently in Beta testing on invite basis
        </p>
        <p className="text-white text-xs">
          {"If you're interested to try out or contribute, please contact:"}
        </p>
        <a href="mailto:hanle.cs23@gmail.com" className="text-white text-xs">
          hanle.cs23@gmail.com
        </a>
      </div>
    </div>
  )
}
