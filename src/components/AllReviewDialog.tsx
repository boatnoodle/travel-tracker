import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { replaceTextWithEllipsis } from "@/lib/utils";
import { Place } from "@/server/api/root";
import { api } from "@/utils/api";
import { BiPlus, BiSolidStar, BiStar } from "react-icons/bi";

// import { ImageSlide } from "./ImageSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageSlide } from "./ImageSlider";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {
  place: Place;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSelectCreateReview: (place: Place) => void;
}

export const AllReviewDialog: React.FC<Props> = ({
  place,
  open,
  onOpenChange,
  onSelectCreateReview,
}) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { data, isLoading } = api.review.getPlaceReviews.useQuery({
    placeId: place.id,
  });
  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */

  /* --------------------------------- Effects -------------------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="DialogContent flex flex-col">
        <Button
          className="flex w-fit gap-1 tracking-wide"
          onClick={() => onSelectCreateReview(place)}
        >
          <BiPlus />
          สร้างรีวิวของฉัน
        </Button>
        {isLoading && <h2 className="text-sm">กำลังโหลด...</h2>}
        {!isLoading && data && data.length === 0 && (
          <h2 className="text-sm">ยังไม่มีรีวิว</h2>
        )}

        {data?.map((each, idx) => (
          <Card className="w-full" key={idx}>
            <CardHeader>
              <CardTitle>{replaceTextWithEllipsis(each.comment, 30)}</CardTitle>
              {each.images && each.images.length > 0 && (
                <ImageSlide images={each.images} />
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>รีวิวของ: {each.user.name}</CardDescription>
              <CardDescription className="flex items-center gap-1">
                คะแนน:
                {new Array(each.rate)
                  .fill(<BiSolidStar color="orange" />)
                  .map((each) => {
                    return each;
                  })}
                {new Array(5 - each.rate)
                  .fill(<BiStar color="orange" />)
                  .map((each) => {
                    return each;
                  })}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>อ่านรีวิวเต็ม</Button>
            </CardFooter>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
};
