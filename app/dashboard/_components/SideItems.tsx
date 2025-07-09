'use client';

import { useState } from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SideItemsProps {
    icon?:LucideIcon;
    label:string;
    href?: string; // Add href for navigation
    onClick?: () => void;
}

function SideItems({
    icon: Icon,
    label,
    href,
    onClick
}: SideItemsProps) {
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
      <Link
        href={href}
        className={`rounded-lg cursor-pointer group min-h-[27px] text-sm font-semibold py-1.5 pl-3 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground`}
        prefetch={false}
      >
        {content}
      </Link>
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