import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Textarea } from "./ui/textarea";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {}

export const CreateReviewModal: React.FC<Props> = () => {
  /* ---------------------------------- Hooks --------------------------------- */

  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */

  /* --------------------------------- Effects -------------------------------- */

  return (
    <DialogContent className="backdrop-blur-none sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>เขียนรีวิว</DialogTitle>
        <DialogDescription>
          เพิ่มประสบการณ์ของคุณเกี่ยวกับทริปนี้
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            คำอธิบาย
          </Label>
          <Textarea
            id="name"
            placeholder="อธิบายเกี่ยวกับสถานที่นี้"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">บันทึก</Button>
      </DialogFooter>
    </DialogContent>
  );
};
