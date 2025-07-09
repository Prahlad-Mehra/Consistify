'use client'

import {
  SignedIn,
} from '@clerk/nextjs'
import Navigation from './_components/Navigation';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SignedIn>
        {/* <UserButton /> */}
        <div className='h-full flex'>
          <Navigation />
          <main className='flex-1 h-full overflow-y-auto'>
            {children}
          </main>
        </div>
    </SignedIn>
  )
}

export default layout
