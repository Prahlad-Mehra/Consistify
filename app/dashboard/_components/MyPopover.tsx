'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import useTodoStore from "@/store/useTodoStore";

interface popProp{
    noteId:number;
}

function MyPopover({noteId}:popProp) {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const addTodo=useTodoStore(state => state.addTodo)

    const handleDone = () => {
        if (inputValue.trim()) {
            toast.success(`Added task: ${inputValue}`);
            setInputValue(""); // Clear input after done
            setPopoverOpen(false); // Close popover after done
            addTodo(noteId,inputValue);
        }
    };

    return (
        <div className="mb-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="cursor-pointer text-zinc-700">Add Task</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 ml-15">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Input
                                    placeholder="Task Name"
                                    className="col-span-3 h-10 w-full focus:shadow-[1px] focus:ring-1 focus:ring-zinc-400"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Button 
                                    className="bg-zinc-800"
                                    disabled={!inputValue.trim()}
                                    onClick={handleDone}
                                >
                                    Done
                                </Button>
                                <Button 
                                    className="bg-zinc-50 text-zinc-900 border-2 hover:bg-zinc-200 cursor-pointer" 
                                    onClick={() => setPopoverOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default MyPopover