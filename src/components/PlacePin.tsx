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
    <div className="flex h-fit w-32 flex-col items-center gap-1 bg-white shadow-lg">
      <a
        className="flex w-full flex-col items-center gap-1 font-kanit-medium text-sm"
        onClick={() => onSelectPreviewReview(placeData)}
        href="#"
      >
        <p className="w-full truncate text-center">{placeData.name}</p>
        <div className="relative h-20 w-full overflow-hidden">
          <Image
            src={getImage("places/" + placeData.images[0])}
            fill={true}
            alt="place-image"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        {/* <div className="my-1 flex gap-1">
          <p className="rounded-full bg-blue-600 px-[6px] py-[1px] text-xs text-white">
            {placeData._count.reviews} รีวิว
          </p>
          <p className="rounded-full bg-blue-600 px-[6px] py-[1px] text-xs text-white">
            คะแนน: {placeData.rate}
          </p>
        </div> */}
      </a>

      <div className="w-full">
        <Button
          className="w-full rounded-full border-[1px] border-emerald-500 bg-emerald-50 text-sm tracking-wide text-emerald-500"
          size="sm"
          onClick={() => onSelectPreviewReview(placeData)}
        >
          อ่าน/เขียนรีวิว
        </Button>
      </div>
    </div>
  );
};
