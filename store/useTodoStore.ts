import {create} from 'zustand';

interface Task{
    id: number;
    text: string;
}

interface TodoList {
    [listId: string]: Task[];
}

interface TodoStore {
    todos: TodoList;
    addTodo: (listId: string, todo: Task) => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
    todos: {
        "inbox": [
            { id: 1, text: "Check emails" },
            { id: 2, text: "Read notifications" },
        ],
        "today": [
            { id: 3, text: "Finish dashboard UI" },
        ],
        "work": [
            { id: 4, text: "Preview meeting notes" },
        ],
    },

    //Actions
    addTodo: (listId: string, todo: Task) => set((state) => ({
        todos: {
            ...state.todos,
            [listId]: [...state.todos[listId] || [], todo]
        }
    })),

    removeTodo: (listId:string, todo: Task)=> set((state)=>({
        todos:{
            ...state.todos,
            [listId]: state.todos[listId].filter(t=> t.id !== todo.id)
        }
    })),

    
}));