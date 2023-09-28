import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();
  const handleClickMap = () => {
    router.push("/map");
  };
  return (
    <main className="flex flex-col items-center justify-center p-3">
      <p className="my-5 text-xl">NP's Travel Tracker</p>
      <Button className="w-full" onClick={handleClickMap}>
        Go to MAP
      </Button>
    </main>
  );
}
