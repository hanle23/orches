import spotifyProfile, { refreshAccessToken } from './SpotifyProfile'
import type { Account, AuthOptions, Profile, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { AuthUser } from '@/app/types/spotify/auth'
import type { ImageObject } from '@/app/types/spotify/general'
interface OAuthProfile extends Profile {
  external_urls: { spotify: string }
  followers: { href: string | null; total: number }
  images: ImageObject[]
}

export const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 59,
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT
      account: Account | null
      profile?: Profile
    }): Promise<JWT> {
      if (account !== null && profile !== undefined) {
        const oauthProfile = profile as OAuthProfile
        return {
          ...token,
          access_token: account.access_token,
          token_type: account.token_type,
          expires_at: account.expires_at,
          expires_in: account.expires_in,
          refresh_token: account.refresh_token,
          scope: account.scope,
          image: oauthProfile?.images,
          external_urls: oauthProfile?.external_urls,
          followers: oauthProfile?.followers,
        }
      }
      const updatedToken = {
        ...token,
        access_token: token?.access_token,
        token_type: token?.token_type,
        expires_at: Number(token?.expires_at ?? Date.now() / 1000),
        expires_in: Number(token?.expires_in ?? 0) - Date.now() / 1000,
        refresh_token: token?.refresh_token,
        scope: token?.scope,
        id: token?.providerAccountId,
        image: token?.image,
        external_urls: token?.external_urls,
        followers: token?.followers,
      }

      if (Number(Date.now() / 1000) + 5 * 60 >= updatedToken.expires_at) {
        return await refreshAccessToken(updatedToken)
      }

      return updatedToken
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token as string,
        token_type: token.token_type as string,
        expires_at: token.expires_at as number,
        expires_in: token.expires_in as number,
        refresh_token: token.refresh_token as string,
        scope: token.scope as string,
        id: token.id as string,
        image: token.image as ImageObject[],
        external_urls: token.external_urls as { spotify: string },
        followers: token.followers as { href: string | null; total: number },
      }
      session.user = user as Session['user']
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
