"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useTodoStore from "@/store/useTodoStore";

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

  return (
    <>
      <div className="flex justify-center mt-20">
        <pre>
        {JSON.stringify(note, null, 2)}
      </pre>
      </div>
    </>
  )
}