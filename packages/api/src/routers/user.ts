import prisma from "@my-better-t-app/db";
import { protectedProcedure } from "../index";
// pas besoin de zod vu que c'est juste des stats

export const userRouter = {
  // -------------------------
  // USER STATS DASHBOARD
  // -------------------------
  getStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id;

    const [user, collectionCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          points: true,
        },
      }),

      prisma.userInsect.aggregate({
        where: { userId },
        _sum: { quantity: true },
      }),
    ]);

    return {
      points: user?.points ?? 0,
      collected: collectionCount._sum.quantity ?? 0,
      completion: 0, // TODO: calcul basé sur total insects
    };
  }),
};