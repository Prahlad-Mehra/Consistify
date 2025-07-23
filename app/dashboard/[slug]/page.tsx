"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useTodoStore from "@/store/useTodoStore";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import RealCalender from "../_components/RealCalender";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const notes = useTodoStore(state => state.notes);

  // Extract the slug from the URL (e.g., "coding" from "/dashboard/coding")
  const slug = pathname.split("/").pop();

  const noteExists = notes.some(note => note.title === slug);

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
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;
  const addDate= useTodoStore(state => state.addDate)
  const id:(number | undefined)= useTodoStore(state => state.notes.find(item => item.title===slug))?.id;

  function done(){
    const today=new Date().toISOString().split('T')[0]
    addDate(today,id!)
    toast.success(`Congratulation on completing today's task`)
  }
  if(!note || !note.id){
    return <>
      Error in loading please refresh again.
    </>
  }
  return (
    <>
    <div className="flex justify-between mt-15 mx-10">
      <div className="flex justify-center">
        <pre className={cn(isMobile && "text-[10px]")}>
          <h1 className="text-xl font-sans font-extrabold">{note?.title}</h1>
        {JSON.stringify(note, null, 2)}
      </pre>
      </div>
      <RealCalender id={note.id}/>
    </div>
    <Button className="cursor-pointer" onClick={done}>Done</Button>
    </>
  )
}