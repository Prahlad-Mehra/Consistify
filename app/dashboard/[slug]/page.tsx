"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useTodoStore from "@/store/useTodoStore";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RealCalender from "../_components/RealCalender";
import MyPopover from "../_components/MyPopover";
import MyTask from "../_components/MyTask";

export default function Page() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const notes = useTodoStore(state => state.notes);

  const rawSlug = pathname.split("/").pop();
  // Decode the URL parameter to handle spaces and special characters
  const slug = rawSlug ? decodeURIComponent(rawSlug) : undefined;

  const noteExists = notes.some(note => note.title === slug);

  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;

  useEffect(() => {
    if (pathname === "/dashboard/home") {
      router.replace("/dashboard");
    }
    // Redirect if the note does not exist
    if (slug && !noteExists) {
      router.replace("/dashboard");
    }
  }, [pathname, router, slug, noteExists]);

  if (pathname === "/dashboard/home" || (slug && !noteExists)) {
    return null; // Prevent rendering if redirected
  }

  const note = notes.find(note => note.title === slug);
  if(!note || !note.id){
    return <>
      Error in loading please refresh again.
    </>
  }
  return (
    <>
    <div className="flex justify-between mt-15 mx-10">
      <div className="mt-5 ml-15">
        <h1 className="text-3xl mb-5 font-sans font-extrabold">{note?.title}</h1> 
        <MyPopover noteId={note.id}/>
        <MyTask CurrNote={note} /> {/*complete this component!!!!*/}

        {
          note.todos.length===0?
            <div className={cn("ml-40 mt-15",
              isMobile && "ml-0 mt-30"
            )}> 
              <Image 
                src="/SwingingDoodle.png"
                height={isMobile ? 400 : 300}
                width={isMobile ? 400 : 300}
                alt="Empty"
              />
              <h1 className="font-semibold text-xl text-center">You have no work for Today!</h1>
            </div>
            : <></>
        }

        {/* <pre className={cn(isMobile && "text-[10px]")}> 
          {JSON.stringify(note, null, 2)}
        </pre> */}
      </div>
      <RealCalender id={note.id}/>
    </div>
    </>
  )
}