'use client'

import { ChevronLeft, MenuIcon ,PlusCircle,Home, LogOut, Settings} from "lucide-react"
import { ElementRef,useRef,useState,useEffect, useCallback } from "react"
import {useMediaQuery} from "usehooks-ts"

import { cn } from "@/lib/utils"
import UserItems from "./UserItems"
import SideItems from "./SideItems"
import WrapDialog from "./WrapDialog"

import SideNotes from "./SideNotes"
import { SignOutButton } from "@clerk/nextjs"

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;

  const isResizingRef=useRef(false)
  const sidebarRef=useRef<ElementRef<"aside">>(null)
  const navbarRef=useRef<ElementRef<"div">>(null)
  const [isResetting,setIsResetting]= useState(false)
  const [isCollapsed,setIsCollapsed]= useState(isMobile)

  const resetWidth =/*useCallback(*/()=>{
    
    // () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  }
  // }


  // },[])

  useEffect(() => {
    if(isMobile){
      collapse()
    }else{
      resetWidth()
    }
  },[isMobile])

  // Combined the pathname effect with the mobile effect
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  // Only re-run when mobile state changes, not on every pathname change
  },[isMobile])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current || !sidebarRef.current || !navbarRef.current) return;
    let newWidth = event.clientX

    if(newWidth < 240) newWidth = 240
    if(newWidth > 480) newWidth = 480

    if(sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left",`${newWidth}px`)
      navbarRef.current.style.setProperty("width",`calc(100% - ${newWidth}px)`)
    } 
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

   

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);
      setIsCollapsed(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  // Helper to handle SideItems click
  const handleSideItemClick = (action: () => void) => {
    return () => {
      action();
      if (isMobile) {
        collapse();
      }
    };
  };

  return (
    <>
        <aside
        ref={sidebarRef}
        className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}>
            <div
            role="button"
            onClick={collapse}
            className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-200 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}>
                <ChevronLeft className="cursor-pointer h-6 w-6"/>
            </div>
          <div className="border-b-2 border-b-neutral-300">
            <UserItems />
          </div>
          <div className="ml-2 mr-2 mb-3 border-b-2 border-b-neutral-300 py-1">
            <WrapDialog>
              <SideItems
                icon={PlusCircle}
                label="Create a note"
                onClick={handleSideItemClick(() => console.log("Create a note clicked"))}
              />
            </WrapDialog>
            <SideItems
              icon={Home}
              label="Home"
              href="/dashboard/home"
            />
          </div>
          <div className="overflow-y-auto">
            <SideNotes />
          </div>
          <div className="border-t-2 absolute bottom-0 h-10 w-full bg-secondary flex items-center justify-between">
            <SideItems
              icon={Settings}
              label="Settings"
              href="/dashboard/Settings"
            /> 
            <SignOutButton>
              <LogOut className="cursor-pointer rounded-sm shrink-0 w-6 h-6 mr-2 text-muted-foreground hover:bg-primary/8 p-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }} />
            </SignOutButton>

          </div>
          <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
           className="opacity-0 group-hover/sidebar:opacity-100
           transition cursor-ew-resize absolute h-full w-1 bg-primary/10 
           right-0 top-0"
           />
        </aside>
        <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full")}
        >
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="hover:bg-neutral-200 rounded-sm cursor-pointer h-6 w-6 text-muted-foreground"/>}
          </nav>
        </div>

    </>
  )
}

export default Navigation
