'use client'

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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

interface WrapDialogProps {
    children?: React.ReactNode;
}

function WrapDialog({children}: WrapDialogProps) {
  return (
    <>
        <Dialog>
            <form>
              <DialogTrigger asChild>
                {children}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
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
                    <Input id="name-1" name="name" placeholder="My Work" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="cursor-pointer" variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild><Button className="cursor-pointer" type="submit" onClick={()=> toast.success("Note created successfully!")}>
                    Create</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
    </>
  )
}

export default WrapDialog