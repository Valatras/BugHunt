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

  // -------------------------
  // SUMMON INSECT WITH POINTS
  // -------------------------
  summon: protectedProcedure
    .input(z.object({ banner: z.enum(["standard", "limited"]) }))
    .handler(async ({ context, input }) => {
      const userId = context.session.user.id;

      const bannerConfig = {
        standard: {
          cost: 100,
          rarities: [
            Rarity.Commun,
            Rarity.Rare,
            Rarity.Epique,
            Rarity.Legendaire,
          ] as Rarity[],
          weights: {
            [Rarity.Commun]: 80,
            [Rarity.Rare]: 15,
            [Rarity.Epique]: 4,
            [Rarity.Legendaire]: 1,
          } as Record<Rarity, number>,
        },
        limited: {
          cost: 250,
          rarities: [
            Rarity.Rare,
            Rarity.Epique,
            Rarity.Legendaire,
          ] as Rarity[],
          weights: {
            [Rarity.Rare]: 55,
            [Rarity.Epique]: 30,
            [Rarity.Legendaire]: 15,
          } as Record<Rarity, number>,
        },
      };

      const config = bannerConfig[input.banner];

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { points: true },
      });

      if (!user || user.points < config.cost) {
        throw new Error("Points insuffisants pour invoquer cet insecte.");
      }

      const candidates = await prisma.insect.findMany({
        where: { rarity: { in: config.rarities } },
      });

      if (candidates.length === 0) {
        throw new Error("Aucun insecte disponible pour cette bannière.");
      }

      const totalWeight = candidates.reduce(
        (sum, candidate) => sum + config.weights[candidate.rarity],
        0,
      );
      let randomValue = Math.random() * totalWeight;
      const chosen = candidates.find((candidate) => {
        randomValue -= config.weights[candidate.rarity];
        return randomValue <= 0;
      }) ?? candidates[candidates.length - 1]!;

      const [updatedUserInsect, updatedUser] = await prisma.$transaction([
        prisma.userInsect.upsert({
          where: {
            userId_insectId: {
              userId,
              insectId: chosen.id,
            },
          },
          create: {
            userId,
            insectId: chosen.id,
            quantity: 1,
          },
          update: {
            quantity: {
              increment: 1,
            },
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            points: {
              decrement: config.cost,
            },
          },
        }),
      ]);

      await prisma.pointTransaction.create({
        data: {
          userId,
          amount: -config.cost,
          reason: `summon ${input.banner}`,
        },
      });

      return {
        insect: {
          id: chosen.id,
          name: chosen.name,
          sciName: chosen.sciName,
          rarity: chosen.rarity,
          imageKey: chosen.imageKey,
          description: chosen.description,
          quantity: updatedUserInsect.quantity,
        },
        pointsLeft: updatedUser.points,
      };
    }),
};


export type UserInsectRouter = typeof userInsectRouter;