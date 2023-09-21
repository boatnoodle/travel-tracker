import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        comment: z.string().min(1),
        rate: z.number().min(0.5).max(5),
        placeId: z.string().min(1),
        imageUrls: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;

      return ctx.db.review.create({
        data: {
          placeId: input.placeId,
          comment: input.comment,
          rate: input.rate,
          images: input.imageUrls,
          userId: user.id,
        },
      });
    }),
  getPlaceReviews: publicProcedure
    .input(z.object({ placeId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.review.findMany({
        where: {
          placeId: input.placeId,
        },
        include: {
          user: true,
        },
      });
    }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.review.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
