import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const placeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lat: z.number(),
        lng: z.number(),
        description: z.string().nullable(),
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
