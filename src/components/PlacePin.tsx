import { PlayCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getImage } from "@/lib/supabase";
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
      <div className="relative h-[64px] w-full overflow-hidden">
        <Image
          src={getImage("places/" + placeData.images[0])}
          fill={true}
          alt="place-image"
          objectFit="cover"
          className="rounded-md"
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
