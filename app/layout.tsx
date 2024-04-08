
import SideBar from '../components/SideBar';
import { SessionProvider } from '../components/SessionProvider';
import './globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login/>
          ): (
              <div className = 'flex'>

            {/* Sidebar */ }
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w[20rem]'>
            <SideBar />
          </div>


          {/* ClientProvider - Notification */}
            <ClientProvider />

          <div className='bg-[#343541] flex-1'>{children}</div>

        </div>
          )}
      </SessionProvider>
    </body>
    </html >
  )
}
