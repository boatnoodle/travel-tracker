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
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {
  placeData: Place;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCreated: () => void;
}

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "จังหวะนี้มันต้องโม้แล้ว เอาหน่อย",
  }),
  rate: z
    .number()
    .min(0, {
      message: "อย่าไปเกรงจัยพี่ ตรงๆไปเลยกี่ดาว",
    })
    .max(5, {
      message: "โอโห เชื่อแล้วว่ามันแจ่มว้าวจริง แต่เต็มที่ 5 ดาวพอนะพี่",
    }),
  placeId: z.string().min(1, {
    message: "แอ๊ะๆ จะแฮ็คหรอ!!!!!!!!",
  }),
});

export const CreateReviewDialog: React.FC<Props> = ({
  placeData,
  open,
  onOpenChange,
  onCreated,
}) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placeId: placeData.id,
      comment: "",
      rate: 5,
    },
  });

  const mutation = api.review.create.useMutation();
  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values);

    toast({
      title: "โม้ให้แล้วนะค้าบ",
      description: "สาธุ~~~ ขอบคุณที่เมตตาแบ่งปันชาวแก๊ง",
    });
    onCreated();
    form.reset();
  }

  /* --------------------------------- Effects -------------------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>พูดถึง ถึง "{placeData.name}" หน่อย</DialogTitle>
              <DialogDescription>
                อย่าไปยอม เค้าโม้กันใหญ่แล้ว
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ให้กี่ดาวดี?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="เดี๋ยวเปลี่ยน?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จัดไปขอยาวๆ ฝุดๆ ไปเลย</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={20}
                        placeholder="เอาให้ชาวแก๊งแห่กันไปเล้ย เอ๊ะ...!? หรือว่าเตือนให้ชาวแก๊งหนีปัยยย!!!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">โม้ ณ บัด now~~~</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
