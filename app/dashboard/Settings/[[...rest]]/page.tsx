'use client';

import { UserProfile } from "@clerk/nextjs";

function page() {
  return (
    <div className="flex justify-center items-center h-screen">
          <UserProfile path="/dashboard/Settings" routing="path" />
    </div>
  )
}

export default page