import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const placeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;

      return ctx.db.place.create({
        data: {
          name: input.name,
          description: input.description,
          userId: user.id,
        },
      });
    }),
  // getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.db.user.findFirst({
  //     where: {
  //       id: input,
  //     },
  //   });
  // }),
});
