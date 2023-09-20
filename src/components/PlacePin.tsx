import React from "react";

import { Place } from "@/server/api/root";

import { Button } from "./ui/button";

interface Props {
  placeData: Place;
}

export const PlacePin: React.FC<Props> = ({ placeData }) => {
  return (
    <div className="flex h-[136px] w-[136px]  flex-col items-center bg-white shadow-lg">
      <div className="flex-auto">
        <img
          src="https://via.placeholder.com/48x48"
          alt="Restaurant Image"
          className="h-[48px] w-[136px] rounded-md object-cover object-center"
        />
      </div>
      <div className="flex-auto">
        <p className="font-kanit-medium font-semibold">{placeData.name}</p>
      </div>
      <div className="flex-auto">
        <Button size="sm">เขียนรีวิว</Button>
      </div>
    </div>
  );
};
