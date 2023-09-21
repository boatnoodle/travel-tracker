import { env } from "@/env.mjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const bucketId = env.NEXT_PUBLIC_BUCKET_ID;

export const supabaseClient = createClientComponentClient({
  supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const getImage = (path: string) =>
  `${env.NEXT_PUBLIC_STORAGE_URL}/${path}`;

export const uploadFile = async (filePath: string, file: File) => {
  return await supabaseClient.storage.from(bucketId).upload(filePath, file);
};

export const downloadFile = async (
  url: string,
  options?: { width: number; height: number },
) => {
  return await supabaseClient.storage
    .from(bucketId)
    .download(url, { transform: options });
};
