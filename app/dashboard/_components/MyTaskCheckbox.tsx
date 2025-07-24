import { Checkbox } from "@/components/ui/checkbox"
import { Label }from "@/components/ui/label"
import { Trash } from "lucide-react"
import { toast } from "sonner";

const s="2025-07-23"

function MyTaskCheckbox() {
  return (
    <>
     <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="group grid grid-cols-[auto_1fr] gap-0.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Enable notifications
          </p>
          <Trash className="ml-4 h-6 w-6 rounded-sm opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bg-zinc-200 p-1"
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              toast.info("Todo is succesfully deleted")
            }}
          />
          <p className="text-muted-foreground text-sm">
            Last Completion Date: {s}
          </p>
        </div>
      </Label>
    </>
  )
}

export default MyTaskCheckbox
