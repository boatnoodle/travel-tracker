import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { replaceTextWithEllipsis } from "@/lib/utils";
import { api } from "@/utils/api";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { ImageSlide } from "./ImageSlider";
import Image from "next/image";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const MyReviewDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { data, isLoading } = api.review.getMyReviews.useQuery();
  const { data: reviewCount, isLoading: loadingReviewCount } =
    api.review.getMyReviewCount.useQuery();
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
            <h2 className="text-sm">คุณต้องโม้หน่อยแล้วละ</h2>
          )}
          <DialogTitle>รีวิวทั้งหมด: {reviewCount}</DialogTitle>
          {data?.map((each, idx) => (
            <Card className="w-[350px]" key={idx}>
              <CardHeader>
                {each.images && each.images.length > 0 && (
                  <ImageSlide images={each.images} />
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex-auto">
                      <Image
                        src={each.user.image}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-auto">
                      <CardDescription>
                        รีวิวของท่าน: {each.user.name}
                      </CardDescription>
                    </div>
                  </div>
                </CardDescription>
                {each.status && (
                  <CardDescription className="mb-4">
                    สถานะรีวิว: <Badge variant="outline">{each.status}</Badge>
                  </CardDescription>
                )}
                <CardDescription>
                  <p className="text-gray-800">{each.comment}</p>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
