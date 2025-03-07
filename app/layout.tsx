import AuthSessionProvider from './components/wrappers/AuthSessionProvider'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import Login from './components/auth/login'
import { Header } from './components/header'
import { getServerSession } from 'next-auth'
import '@/app/globals.css'
export const metadata = {
  title: 'Orches',
  description: 'A playlist manager for Spotify',
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full w-full">
        {' '}
        <AuthSessionProvider session={session}>
          {session !== null ? (
            <div className="h-full w-full bg-spotify-background text-white">
              <Header />
              {children}
            </div>
          ) : (
            <Login />
          )}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
