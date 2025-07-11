import { create } from 'zustand';

// Updated interfaces to match Prisma schema
interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Note {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    todos: Task[];
}

interface TodoStore {
    notes: Note[];
    loading: boolean;
    error: string | null;
    
    // Data fetching
    fetchNotes: () => Promise<void>;
    
    // Note operations
    addNote: (name: string) => Promise<void>;
    updateNoteName: (noteId: string, newName: string) => Promise<void>;
    deleteNote: (noteId: string) => Promise<void>;
    
    // Todo operations
    addTodo: (noteId: string, text: string) => Promise<void>;
    updateTodo: (noteId: string, todoId: string, text: string) => Promise<void>;
    toggleTodo: (noteId: string, todoId: string) => Promise<void>;
    deleteTodo: (noteId: string, todoId: string) => Promise<void>;
    
    // UI helpers
    clearError: () => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
    notes: [
        {
            id: 'Inbox',
            name: 'Inbox',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            todos: [
                {
                    id: '1',
                    text: 'Sample Todo',
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]
        },
        {
            id: 'Today',
            name: 'Today',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            todos: [
                {
                    id: '2',
                    text: 'Complete the project',
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '3',
                    text: 'Attend the meeting',
                    completed: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]
        },
        {
            id: 'Upcoming',
            name: 'Upcoming',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            todos: [
                {
                    id: '4',
                    text: 'Plan the next sprint',
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]
        }
    ],
    loading: false,
    error: null,

    // Fetch all notes from database
    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/notes');
            if (!response.ok) throw new Error('Failed to fetch notes');
            const notes = await response.json();
            set({ notes, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Add new note
    addNote: async (name) => {
        set({ loading: true, error: null });
        try {
            const add={
            id: `${name}`,
            name: `${name}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            todos: [
                {
                    id: '2',
                    text: 'Complete the newly added project',
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: '3',
                    text: 'Attend the newly added meeting',
                    completed: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ]
        }
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error('Failed to add note');
            const newNote = await response.json();
            set(state => ({ 
                notes: [...state.notes, add], 
                loading: false 
            }));
            console.log(get().notes.map(note => note.name))
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Update note name
    updateNoteName: async (noteId, newName) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });
            if (!response.ok) throw new Error('Failed to update note');
            const updatedNote = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId ? updatedNote : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Delete note
    deleteNote: async (noteId) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/${noteId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete note');
            set(state => ({
                notes: state.notes.filter(note => note.id !== noteId),
                loading: false
            }));
            console.log(get().notes.map(note => note.name))
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Add todo to note
    addTodo: async (noteId, text) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/notes/${noteId}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const newTodo = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId 
                        ? { ...note, todos: [...note.todos, newTodo] }
                        : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Update todo text
    updateTodo: async (noteId, todoId, text) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/todos/${todoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error('Failed to update todo');
            const updatedTodo = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId 
                        ? { 
                            ...note, 
                            todos: note.todos.map(todo => 
                                todo.id === todoId ? updatedTodo : todo
                            ) 
                        }
                        : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Toggle todo completion
    toggleTodo: async (noteId, todoId) => {
        const note = get().notes.find(n => n.id === noteId);
        const todo = note?.todos.find(t => t.id === todoId);
        if (!todo) return;

        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/todos/${todoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todo.completed }),
            });
            if (!response.ok) throw new Error('Failed to toggle todo');
            const updatedTodo = await response.json();
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId 
                        ? { 
                            ...note, 
                            todos: note.todos.map(todo => 
                                todo.id === todoId ? updatedTodo : todo
                            ) 
                        }
                        : note
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    // Delete todo
    deleteTodo: async (noteId, todoId) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/todos/${todoId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete todo');
            set(state => ({
                notes: state.notes.map(note => 
                    note.id === noteId 
                        ? { 
                            ...note, 
                            todos: note.todos.filter(todo => todo.id !== todoId) 
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