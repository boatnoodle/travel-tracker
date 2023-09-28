import React, { useState } from "react";
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
import { uploadFile } from "@/lib/supabase";
import { location } from "@/pages/map";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Loader } from "./Loader";

/* --------------------------------- Styles --------------------------------- */

/* ------------------------------- Interfaces ------------------------------- */
interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  location: location;
  onCreated: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "บอกหน่อยน้า",
  }),
  description: z.string().nullable(),
  images: z.any(),
});

export const CreatePlaceDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  location,
  onCreated,
}) => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  const mutation = api.place.create.useMutation();
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

      const { lat, lng } = location;
      await mutation.mutateAsync({ ...values, lat, lng, images: imageUrls });
      toast({
        title: "สร้างแว้ววว",
        description: "ไหน! รีวิวให้เด็กมันดูหน่อยคับ",
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

      let { error: uploadError } = await uploadFile("places/" + filePath, file);

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
      throw error(error);
    }
  };

  /* --------------------------------- Effects -------------------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="DialogContent">
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
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>ไหนขอภาพกาวๆ หน่อย</FormLabel>
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
                {loading
                  ? "โหลดอยู่ๆ ดูน้องกลิ้งเพลินๆไปก่อนนะ"
                  : "สร้างเล้ย~~~"}
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
