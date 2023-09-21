import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { replaceTextWithEllipsis } from "@/lib/utils";
import { Place } from "@/server/api/root";
import { api } from "@/utils/api";
import { DialogOverlay } from "@radix-ui/react-dialog";

import { ImageSlide } from "./ImageSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {
  place: Place;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const AllReviewDialog: React.FC<Props> = ({
  place,
  open,
  onOpenChange,
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
      <DialogOverlay className="DialogOverlay">
        <DialogContent className="DialogContent justify-center">
          {isLoading && <h2 className="text-sm">โหลดแป๊ปๆ</h2>}
          {!isLoading && data && data.length === 0 && (
            <h2 className="text-sm">ยังไม่มีคนโม้เลยอ่ะ</h2>
          )}
          {data?.map((each, idx) => (
            <Card className="w-[350px]" key={idx}>
              <CardHeader>
                <CardTitle>
                  {replaceTextWithEllipsis(each.comment, 30)}
                </CardTitle>
                {each.images && each.images.length > 0 && (
                  <ImageSlide images={each.images} />
                )}
              </CardHeader>
              <CardContent>
                <CardDescription>
                  รีวิวของท่าน: {each.user.name}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>ส่องเพิ่ม</Button>
              </CardFooter>
            </Card>
          ))}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
