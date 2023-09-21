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
    <div className="flex h-full w-32 flex-col items-center gap-3 bg-white shadow-lg">
      <a
        className="flex w-full flex-col items-center gap-1 font-kanit-medium text-sm"
        onClick={() => onSelectPreviewReview(placeData)}
        href="#"
      >
        {placeData.name}
        <div className="relative h-[64px] w-full overflow-hidden">
          <Image
            src={getImage("places/" + placeData.images[0])}
            fill={true}
            alt="place-image"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </a>

      <div className="">
        <Button
          className="rounded-full border-[1px] border-emerald-500 bg-emerald-50 px-3 tracking-wide text-emerald-500"
          size="sm"
          onClick={() => onSelectPreviewReview(placeData)}
        >
          อ่าน/เขียนรีวิว
        </Button>
      </div>
    </div>
  );
};
