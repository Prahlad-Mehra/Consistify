import { create } from 'zustand';

// Updated interfaces to match Prisma schema
interface Task {
    id: number;
    parentNoteId: number;
    name: string;
    updateAt: string
}

interface Note {
    id: number;
    userId: number;
    title: string;
    todos: Task[];
    calendarDates:CalendarDates[]
}

interface CalendarDates{
    id:number;
    parentNote: number;
    date: string
}
interface EnsureCalendarDates{
    id:number;
    parentNote:number;
    date: string;
}
interface EnsureTodo{
    id:number;
    parentNoteId:number;
    name: string;
    createdAt: string;
    updateAt: string;
}
interface EnsureNote{
    id:number;
    userId:number;
    title: string;
    createdAt: string;
    todos: EnsureTodo[];
    completedCalendarDates: EnsureCalendarDates[]
}

interface EnsureObj{
    id:number;
    userName: string;
    clerkID: string;
    notes:EnsureNote[]
}

interface TodoStore {
    id:number;
    userName: string;
    clerkID: string;
    notes: Note[];
    loading: boolean;
    error: string | null;

    // Note operations
    addDate: (day:string,id:number) => void;
    addNote: (name: string) => Promise<void>;
    deleteNote: (noteId: number, title:string, userSerialId:number) => Promise<void>;
    
    // Todo operations
    addTodo: (noteId: number, text: string) => Promise<void>;
    updateTodo: (reqParentNoteId:number ,reqName: string, reqId:number , updateItToToday: string) => Promise<void>;
    deleteTodo: (reqParentNoteId:number,reqName: string,reqId:number) => Promise<void>;
    addFromEnsure : (ensureObj:EnsureObj) => void; //change it to useful type
    // UI helpers
    clearError: () => void;
    initialData: boolean;
    setInitialData: ()=> void;
    setCalendarDate: (Currid:number,parentNoteId:number,today:string)=> Promise<void>

}

const useTodoStore = create<TodoStore>((set) => ({
    setCalendarDate: async (Currid:number,parentNoteId:number,today:string) =>{
        try{
            const updatedDate = await fetch('/api/user/calendarDates', {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({id: Currid, parentNote: parentNoteId, date: today})
            });
            if (!updatedDate.ok){
                throw new Error('Failed to update calendar date');
            } 
            const result = await updatedDate.json();
            console.log(`Updated calendar date: ${result.date} for note ID: ${parentNoteId}`);
            // Update the state with the new calendar date
            

            set(state => ({
            notes: state.notes.map((note: Note) =>
                note.id === parentNoteId
                    ? {
                        ...note,
                        calendarDates: [
                            ...note.calendarDates,{
                                id: result.id,
                                parentNote: parentNoteId,
                                date: result.date
                            }],
                    }
                    : note
            )
        }));
        } catch(error){
            console.error('Error while setting calendar date', error);
        }
        
    },
    initialData:false,
    setInitialData: ()=>{
        set(()=>({
            initialData: true
        }));
    },
    id:0,
    userName:'',
    clerkID:'',
    addFromEnsure: (ensureObj:EnsureObj) =>{
        const transformedNotes: Note[] = ensureObj.notes.map(note => ({
            id: note.id,
            userId: note.userId,
            title: note.title,
            todos: note.todos.map(todo => ({
              id: todo.id,
              parentNoteId: todo.parentNoteId,
              name: todo.name,
              updateAt: todo.updateAt,
            })),
            calendarDates: note.completedCalendarDates.map(date => ({
              id: date.id,
              parentNote: date.parentNote,
              date: date.date,
            })),
        }));
        set(() =>({
            id:ensureObj.id,
            userName:ensureObj.userName,
            clerkID:ensureObj.clerkID,
            notes: transformedNotes
        }))
    },
    notes: [
    ],
    loading: false,
    error: null,

    addDate: async (day:string,parentNoteId:number) =>{
        try{
            const response=await fetch('/api/user/calendarDates',{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({reqParentNoteId: parentNoteId, reqDate: day})
            })
            if (!response.ok) throw new Error('Failed to add date to calendar');
            const result=await response.json()
        
            set(state => ({
              notes: state.notes.map(item =>
                item.id === parentNoteId
                  ? {
                      ...item,
                      calendarDates: [
                        ...item.calendarDates,
                        {
                          id: result.id,
                          parentNote: parentNoteId,
                          date: result.date,
                        },
                      ],
                    }
                  : item
                ),
            }));
        } catch(error){
            set({ error: (error as Error).message, loading: false });
        }
    },
    // Add new note
    addNote: async (title) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/user/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) throw new Error('Failed to add note');
            const newNote = await response.json();
            set(state => ({ 
                notes: [
                    ...state.notes, 
                    {
                        id: newNote.id,
                        userId: newNote.userId,
                        title: newNote.title,
                        todos: [],
                        calendarDates: []
                    }
                ], 
                loading: false 
            }));
            // console.log(get().notes.map(note => note.title))
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    // Delete note
    deleteNote: async (noteId,title,userSerialId) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/user/notes`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ noteId,title,userSerialId }),
            });
            if (!response.ok) throw new Error('Failed to delete note');
            set(state => ({
                notes: state.notes.filter(note => note.id !== noteId),
                loading: false
            }));
            // console.log(get().notes.map(note => note.title))
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Add todo to note
    addTodo: async (noteId, text) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/user/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reqName:text, reqParentNoteId:noteId }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const newTodo = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId
                        ? {
                            ...note,
                            todos: [
                                ...note.todos,
                                {
                                    id: newTodo.id,
                                    parentNoteId: noteId,
                                    name: newTodo.name,
                                    updateAt: newTodo.updateAt
                                }
                            ]
                        }
                        : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    //update todo to latest date of completion
    updateTodo: async (reqParentNoteId, reqName, reqId, updateItToToday) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/user/todos`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({reqParentNoteId, reqName, reqId, updateItToToday }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const newTodo = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    {
                        if(note.id===reqParentNoteId){
                            note.todos = note.todos.map(item => 
                                item.id === reqId
                                    ? {
                                        ...item,
                                        name: newTodo.name,
                                        updateAt: newTodo.updateAt
                                    }
                                    : item
                            );
                            return note
                        } else{
                            return note
                        }
                    }
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    // Delete todo
    deleteTodo: async (reqParentNoteId, reqName, reqId) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/user/todos`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({reqParentNoteId, reqName, reqId }),
            });
            if (!response.ok) throw new Error('Failed to delete todo');
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === reqParentNoteId 
                        ? { 
                            ...note, 
                            todos: note.todos.filter(todo => todo.id !== reqId) 
                        }
                        : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Clear error state
    clearError: () => set({ error: null }),
}));

export default useTodoStore;