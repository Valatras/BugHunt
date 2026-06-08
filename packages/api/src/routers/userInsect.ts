import prisma from "@my-better-t-app/db";
import z from "zod";
import { protectedProcedure } from "../index";
import { Rarity } from "../../../db/prisma/generated/enums";

export const userInsectRouter = {
  // -------------------------
  // COLLECTION COMPLETE
  // -------------------------
  getMyCollection: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    return prisma.userInsect.findMany({
      where: { userId },
      include: {
        insect: true,
      },
      orderBy: {
        insectId: "asc",
      },
    });
  }),

  // -------------------------
  // RECENT ACTIVITY
  // -------------------------
  getRecent: protectedProcedure
    .input(z.object({ limit: z.number().default(5) }).optional())
    .handler(async ({ context, input }) => {
      const userId = context.session.user.id;

      return prisma.userInsect.findMany({
        where: { userId },
        include: { insect: true },
        orderBy: { id: "desc" },
        take: input?.limit ?? 5,
      });
    }),

  // -------------------------
  // ADD / CAPTURE INSECT
  // -------------------------
  capture: protectedProcedure
    .input(z.object({ insectId: z.number() }))
    .handler(async ({ context, input }) => {
      const userId = context.session.user.id;

      // upsert collection
      await prisma.userInsect.upsert({
        where: {
          userId_insectId: {
            userId,
            insectId: input.insectId,
          },
        },
        create: {
          userId,
          insectId: input.insectId,
          quantity: 1,
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
      });

      // add points (simple gamification rule)
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: 10,
          },
        },
      });

      return { success: true };
    }),
};


export type UserInsectRouter = typeof userInsectRouter;