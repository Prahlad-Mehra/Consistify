import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

const page = async () => {
    
  return (
    <SignedIn>
        <UserButton />
        <h1>Hello User</h1>
    </SignedIn>
  )
}

export default page
