'use clinet';

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import WorkingCalendar from "./WorkingCalendar";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface calendarProp{
  id:number
}

function RealCalender({id}:calendarProp) {
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;
  if(isMobile){
    return (
        <Sheet>
  <SheetTrigger asChild>
    <Button className="cursor-pointer absolute right-10 top-10">
      Calendar
    </Button>
    
  </SheetTrigger>
  <SheetContent className="w-[400px] sm:w-[540px] z-[99999]">
    <SheetHeader>
      <SheetTitle className="text-2xl text-center">Streak Calendar</SheetTitle>
      
    </SheetHeader>
    <div className={cn(isMobile && "mt-10")}>
      <WorkingCalendar id={id} />
    </div>
   </SheetContent>
 </Sheet>
    )
  }
  return (
    <div className={cn(isMobile && "mt-10")}>
      <WorkingCalendar id={id} />
    </div>
  )
}

export default RealCalender