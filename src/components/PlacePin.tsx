import React from "react";

import { Place } from "@/server/api/root";

import { Button } from "./ui/button";

interface Props {
  onSelectPreviewReview: (place: Place) => void;
  onSelectCreateReview: (place: Place) => void;
  placeData: Place;
}

export const PlacePin: React.FC<Props> = ({
  onSelectCreateReview,
  onSelectPreviewReview,
  placeData,
}) => {
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
        <a
          className="font-kanit-medium"
          onClick={() => onSelectPreviewReview(placeData)}
          href="#"
        >
          {placeData.name} (คลิก)
        </a>
      </div>
      <div className="flex-auto">
        <Button size="sm" onClick={() => onSelectCreateReview(placeData)}>
          เขียนรีวิว
        </Button>
      </div>
    </div>
  );
};
