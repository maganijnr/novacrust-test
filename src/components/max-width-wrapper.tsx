import { cn } from "@/lib/utils";
import React from "react";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full max-w-[640px]", className && className)}>
      {children}
    </div>
  );
}
