import { Checkbox } from "@/components/ui/checkbox"
import { Label }from "@/components/ui/label"
import useTodoStore from "@/store/useTodoStore";
import { Trash } from "lucide-react"
import { toast } from "sonner";

interface Task {
    id: number;
    parentNoteId: number;
    name: string;
    updateAt: string
}

function MyTaskCheckbox(todo: Task) {
  const deleteTodo = useTodoStore(state => state.deleteTodo)
  const updateTodo= useTodoStore(state=> state.updateTodo)

  return (
    <div className="my-4">
     <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          className="data-[state=unchecked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          onCheckedChange={(checked: boolean) => {
            updateTodo(todo.parentNoteId,todo.name,todo.id,new Date().toISOString().split('T')[0]);
            toast.success(checked ? "Task completed!" : "Task uncompleted!")
          }}
        />
        <div className="group grid grid-cols-[auto_1fr] gap-0.5 font-normal">
          <p className="text-sm leading-none font-medium">
            {todo.name}
          </p>
          <Trash className="ml-4 h-6 w-6 rounded-sm opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bg-zinc-200 p-1"
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              deleteTodo(todo.parentNoteId,todo.name,todo.id);
              toast.info("Todo is succesfully deleted")
            }}
          />
          <p className="text-muted-foreground text-sm">
            Last Completion Date: {/*put last update date*/todo.updateAt==="1999-12-30"? "Never done before":todo.updateAt}
          </p>
        </div>
      </Label>
    </div>
  )
}

export default MyTaskCheckbox
