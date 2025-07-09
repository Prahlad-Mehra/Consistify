"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname() || "";
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/dashboard/home") {
      router.replace("/dashboard");
    }
  }, [pathname, router]);

  if (pathname === "/dashboard/home") {
    return null; // Prevent rendering if redirected
  }

  return <div>My Post: {pathname}</div>;
}