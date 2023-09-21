import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
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
import { uploadFile } from "@/lib/supabase";
import { Place } from "@/server/api/root";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "./Loader";
import { Rating } from "./Rating";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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
    .string()
    .min(0, {
      message: "อย่าไปเกรงจัยพี่ ตรงๆไปเลยกี่ดาว",
    })
    .max(5, {
      message: "โอโห เชื่อแล้วว่ามันแจ่มว้าวจริง แต่เต็มที่ 5 ดาวพอนะพี่",
    }),
  placeId: z.string().min(1, {
    message: "แอ๊ะๆ จะแฮ็คหรอ!!!!!!!!",
  }),
  images: z.any(),
});

export const CreateReviewDialog: React.FC<Props> = ({
  placeData,
  open,
  onOpenChange,
  onCreated,
}) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placeId: placeData.id,
      comment: "",
      rate: "",
      images: [],
    },
  });

  const mutation = api.review.create.useMutation();
  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const files = values.images;
      let imageUrls = [];

      if (files && files.length > 0) {
        for (const file of files) {
          const url = await uploadImage(file);
          imageUrls.push(url);
        }
      }

      await mutation.mutateAsync({
        ...values,
        rate: Number(values.rate),
        imageUrls,
      });
      toast({
        title: "โม้ให้แล้วนะค้าบ",
        description: "สาธุ~~~ ขอบคุณที่เมตตาแบ่งปันชาวแก๊ง",
      });

      onCreated();
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "พังคับโพ้มม",
        description: JSON.stringify(error.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = async (file: File) => {
    try {
      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      // const fileExt = file.name.split(".").pop();
      // const imageExtensions = [
      //   ".jpg",
      //   ".jpeg",
      //   ".png",
      //   ".gif",
      //   ".bmp",
      //   ".tif",
      //   ".tiff",
      //   ".webp",
      //   ".svg",
      //   ".raw (various extensions)",
      //   ".ico",
      //   ".heif",
      //   ".heic",
      //   ".exif",
      // ];
      // let filePath: string;

      // if (!imageExtensions.includes(fileExt)) filePath = `${Date.now()}`;
      // else filePath = `${Date.now()}.${fileExt}`;
      const filePath = Date.now() + ".jpg";

      let { error: uploadError } = await uploadFile(
        "reviews/" + filePath,
        file,
      );

      if (uploadError) {
        toast({
          description: JSON.stringify(uploadError.message),
          variant: "destructive",
        });
        throw uploadError;
      }

      return filePath;
    } catch (error) {
      toast({
        description: JSON.stringify(error.message),
        variant: "destructive",
      });
      throw error(error.message);
    }
  };

  /* --------------------------------- Effects -------------------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="DialogContent">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>พูดถึง "{placeData.name}" หน่อย</DialogTitle>
              <DialogDescription>
                อธิบายความประทับใจ หรือไม่ประทับใจ ที่มีต่อที่นี่
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. ให้คะแนนที่นี่เท่าไร</FormLabel>
                    <FormControl>
                      <Rating
                        value={form.getValues().rate}
                        onChange={(e) => form.setValue("rate", e)}
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
                    <FormLabel>2. บรรยายความรู้สึกแบบเรียลๆ ไปเลย</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        placeholder="แบ่งปันประสบการณ์ ทั้งที่ประทับใจ และไม่ประทับใจให้ทุกคนรู้"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      3. แบ่งปันทั้งภาพสวยๆ และภาพเรียลๆ ให้เพื่อนๆ เห็น
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        {...form.register("images")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังโหลด..." : "แชร์ประสบการณ์เลย"}
              </Button>
            </DialogFooter>
            {loading && (
              <DialogFooter>
                <div className="flex justify-center text-center">
                  <Loader />
                </div>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
