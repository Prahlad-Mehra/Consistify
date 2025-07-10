'use client';

import { LucideIcon , Trash2} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useTodoStore from "../../../store/useTodoStore"; // Adjust the import path as necessary

interface SideItemsProps {
    icon?:LucideIcon;
    label:string;
    href?: string; // Add href for navigation
    del?: boolean; // Optional prop for delete functionality
    onClick?: () => void;
}

function SideItems({
    icon: Icon,
    label,
    href,
    del,
    onClick
}: SideItemsProps) {
  const deleteNote = useTodoStore((state) => state.deleteNote);
  const content = (
    <>
      {Icon && <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />}
      <span className="truncate">
          {label}
      </span>
    </>
  );

  if (href) {
    return (
      <div className="group flex items-center justify-between my-0.5 ml-2 px-1 py-0.5 mr-3 rounded-sm hover:bg-primary/5">
        <Link
          href={href}
          className={` cursor-pointer group min-h-[27px] text-sm font-semibold w-full flex items-center text-muted-foreground`}
          prefetch={false}
        >
          {content}
        </Link>
        {del && (
          <div className="opacity-100 sm:opacity-0 group-hover:opacity-100">
            <Trash2 className="cursor-pointer rounded-sm shrink-0 w-6 h-6 mr-2 text-muted-foreground hover:bg-primary/8 p-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteNote(label);
              }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      role="button"
      className="rounded-lg cursor-pointer group min-h-[27px] text-sm font-semibold py-1.5 pl-3 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground"
      >
        {content}
    </div>
  )
}

export default SideItems