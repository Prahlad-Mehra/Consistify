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

  const noteExists = notes.some(note => note.id === slug);

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

  const note = notes.find(note => note.id === slug);
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;
  const addDate= useTodoStore(state => state.addDate)
  const id:(string | undefined)= useTodoStore(state => state.Calendar.find(item => item.id===slug))?.id;

  function done(){
    const today=new Date().toISOString().split('T')[0]
    addDate(today,id!)
    toast.success(`Congratulation on completing today's task`)
  }

  return (
    <div className="mt-15 mx-10">
      <RealCalender id={`${note?.id}`}/>
      <div className="flex justify-center">
        <pre className={cn(isMobile && "text-[10px]")}>
          <h1 className="text-xl font-sans font-extrabold">{note?.name}</h1>
        {JSON.stringify(note, null, 2)}
      </pre>
      </div>
      <Button className="cursor-pointer" onClick={done}>Done</Button>
    </div>
    
  )
}