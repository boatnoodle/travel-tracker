import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { location } from "@/pages";
import { Place } from "@/server/api/root";
import { api } from "@/utils/api";
import { DialogOverlay } from "@radix-ui/react-dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();

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
        <DialogContent className="DialogContent">
          {isLoading && <h2 className="text-sm">โหลดแป๊ปๆ</h2>}
          {!isLoading && data && data.length === 0 && (
            <h2 className="text-sm">ยังไม่มีคนโม้เลยอ่ะ</h2>
          )}
          {data?.map((each, idx) => (
            <Card className="w-[350px]" key={idx}>
              <CardHeader>
                <CardTitle>รีวิวของท่าน {each.userId}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{each.comment}</CardDescription>
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
