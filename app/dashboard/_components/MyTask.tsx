'use client';

import { useRef } from "react";
import MyTaskCheckbox from "./MyTaskCheckbox";
import useTodoStore from "@/store/useTodoStore";

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
  const today= new Date().toISOString().split('T')[0]
  // this whole logic is bugging hard right now fix this
  const setCalendarDate = useTodoStore(state => state.addDate);
  const CalendarDateRef= useRef(0);
  for(let i=0;i<CurrNote.todos.length;i++){
    if(CurrNote.todos[i].updateAt === new Date().toISOString().split('T')[0]){
      CalendarDateRef.current+=1;
    }
  }
  if(CalendarDateRef.current >0 && CalendarDateRef.current===CurrNote.todos.length){
    setCalendarDate(today, CurrNote.id);
  }

 // this is not working properly fix this ASAP
  return (
    <div>
      {
        CurrNote.todos.map(todo => 
          todo.updateAt !== today
          ? <div key={todo.id}><MyTaskCheckbox {...todo} /></div>
          : null
        )
      }
    </div>
  )
}

export default MyTask