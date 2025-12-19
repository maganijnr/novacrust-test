"use client";
import { useProgressBarRouter } from "@/helpers/use-progress-bar-router";
import { useEffect } from "react";

export default function Home() {
  const router = useProgressBarRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }, []);

  return (
    <div className="w-full min-h-screen bg-novacrust-primary flex items-center justify-center">
      <h2 className="text-2xl font-bold text-novacrust-light animate-pulse duration-500 ease-in-out">
        Novacrust
      </h2>
    </div>
  );
}
