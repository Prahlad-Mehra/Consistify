'use client';

import { useEffect} from "react";
import MyTaskCheckbox from "./MyTaskCheckbox";
import useTodoStore from "@/store/useTodoStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

interface Task {
    id: number;
    parentNoteId: number;
    name: string;
    updateAt: string
}

interface CalendarDates {
    id: number;
    parentNote: number;
    date: string;
}

interface Props {
    CurrNote: {
        id: number;
        userId: number;
        title: string;
        todos: Task[];
        calendarDates: CalendarDates[];
    }
}

function MyTask({ CurrNote }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;

  const setCalendarDate = useTodoStore(state => state.addDate);
  
  useEffect(() => {
    let todayTaskCount = 0;
    
    // Count tasks updated today
    for (let i = 0; i < CurrNote.todos.length; i++) {
      if (CurrNote.todos[i].updateAt === today) {
        todayTaskCount += 1;
      }
    }

    if (todayTaskCount > 0 && todayTaskCount === CurrNote.todos.length) {
      setCalendarDate(today, CurrNote.id);
    }
  }, [CurrNote.todos, today, CurrNote.id, setCalendarDate]);

  // Check if all todos are updated today
  const allTodosUpdatedToday = CurrNote.todos.length > 0 && 
    CurrNote.todos.every(todo => todo.updateAt === today);

  // Get todos that are NOT updated today
  const incompleteTodos = CurrNote.todos.filter(todo => todo.updateAt !== today);

  return (
    <div>
      {allTodosUpdatedToday ? (
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
      ) : (
        incompleteTodos.map(todo => (
          <div key={todo.id}>
            <MyTaskCheckbox {...todo} />
          </div>
        ))
      )}
    </div>
  )
}

export default MyTask