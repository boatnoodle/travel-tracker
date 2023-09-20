import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { location } from "@/pages";
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
  location: location;
  onCreated: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "บอกหน่อยน้า",
  }),
  description: z.string().nullable(),
});

export const CreateReviewContent: React.FC<Props> = ({
  location,
  onCreated,
}) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const mutation = api.place.create.useMutation();
  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { lat, lng } = location;
    console.log;
    await mutation.mutateAsync({ ...values, lat, lng });
    toast({
      title: "สร้างแว้ววว",
      description: "ไหน! รีวิวให้เด็กมันดูหน่อยคับ",
    });
    onCreated();
    form.reset();
  }

  /* --------------------------------- Effects -------------------------------- */

  return (
    <DialogContent className="backdrop-blur-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>เปิดประเด็น</DialogTitle>
            <DialogDescription>เพื่อนๆจะได้มาตำ</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ที่ใหนเอ่ย</FormLabel>
                  <FormControl>
                    <Input placeholder="ที่ใหนน้า?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เกริ่นๆ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ไม่ต้องยาวมากก็ได้ พอกล้อมแกล้ม..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">สร้างเล้ย~~~</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
