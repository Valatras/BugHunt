import prisma from "@my-better-t-app/db";
import { protectedProcedure } from "../index";
// pas besoin de zod vu que c'est juste des stats
export const userRouter = {
  getStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      user,
      collectionCount,
      totalSpecies,
      todaySteps,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          points: true,
        },
      }),

      prisma.userInsect.count({
        where: { userId },
      }),

      prisma.insect.count(),

      prisma.dailySteps.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      }),
    ]);

    const points = user?.points ?? 0;

    return {
      points,
      level: Math.floor(points / 100) + 1,

      discoveredSpecies: collectionCount,

      totalSpecies,

      completion:
        totalSpecies > 0
          ? Math.round(
              (collectionCount / totalSpecies) * 100,
            )
          : 0,

      todaySteps: todaySteps?.steps ?? 0,
    };
  }),

  getRecentTransactions: protectedProcedure.handler(
  async ({ context }) => {
    const userId = context.session.user.id;

    return prisma.pointTransaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  },
),
};