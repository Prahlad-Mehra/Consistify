'use client'

import { SignOutButton} from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { ChevronsLeftRight } from "lucide-react"
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

function UserItems() {
  const { user } = useUser()
  

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div role="button" className="cursor-pointer flex items-center text-sm px-3 py-2 w-full hover:bg-primary/5">
                <div className="gap-x-2 flex items-center max-w-[150px]">
                    <Avatar className="w-7 h-7 ">
                        <AvatarImage
                            src={user?.imageUrl || "/default-avatar.png"}
                            alt={user?.firstName || "User Avatar"}
                        />
                    </Avatar>
                    <span className="text-start font-medium line-clamp-1">
                        {user?.firstName || "User"}
                    </span>
                </div>
                <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="start"
            className="w-80"
            alignOffset={11}
            forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress || "No email address"}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user?.imageUrl || "/default-avatar.png"}
                                    alt={user?.firstName || "User Avatar"}
                                />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.firstName || "User"} {user?.lastName || ""}&apos;s Profile
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SignOutButton>
                        <div className="cursor-pointer flex items-center gap-x-2 hover:bg-[#e3e3e3] pl-3 py-2 pr-55 rounded-sm">
                            <span className="text-sm font-semibold ">Sign Out</span>
                        </div>
                    </SignOutButton>
                </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default UserItems