import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const placeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        lat: z.number().min(1),
        lng: z.number().min(1),
        description: z.string().nullable(),
        images: z.array(z.string()).min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;

      return ctx.db.place.create({
        data: {
          name: input.name,
          description: input.description,
          lat: input.lat,
          lng: input.lng,
          images: input.images,
          userId: user.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.place.findMany({});
  }),
  // getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.db.user.findFirst({
  //     where: {
  //       id: input,
  //     },
  //   });
  // }),
});
