'use client';

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import useTodoStore from "@/store/useTodoStore";

const Page = () => {
  const [noteName, setNoteName] = useState("");
  const addNote = useTodoStore((state) => state.addNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteName.trim()) return;
    addNote(noteName);
    toast.success("Note created successfully!");
    setNoteName("");
    // Dialog will close automatically due to DialogClose
  };

  return (
        <>
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <Image 
            src="/MessyDoodle.png"
            height={300}
            width={300}
            alt="Empty"
          />
          <h2 className="text-large font-medium">
            Welcome to your dashboard
            <br />
          </h2>
          <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create a note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create Note</DialogTitle>
                  <DialogDescription>
                    Add new Note to cover. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input 
                      id="name-1"
                      name="name"
                      placeholder="My Work"
                      value={noteName}
                      onChange={(e) => setNoteName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="cursor-pointer" variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild><Button disabled={!noteName.trim()} className="cursor-pointer" type="submit">
                    Create</Button></DialogClose>
                </DialogFooter>
                </form>
              </DialogContent>
          </Dialog>
        </div>
        </>
        ) 
};

export default Page;