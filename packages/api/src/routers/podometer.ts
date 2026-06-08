import prisma from "@my-better-t-app/db";
import z from "zod";
import { protectedProcedure } from "../index";

export const podometerRouter = {
  // -------------------------
  // ADD DAILY STEPS
  // -------------------------
  addSteps: protectedProcedure
    .input(
      z.object({
        date: z.string(), // ISO
        steps: z.number().min(0),
      })
    )
    .handler(async ({ context, input }) => {
      const userId = context.session.user.id;

      const date = new Date(input.date);

      const result = await prisma.dailySteps.upsert({
        where: {
          userId_date: {
            userId,
            date,
          },
        },
        create: {
          userId,
          date,
          steps: input.steps,
        },
        update: {
          steps: input.steps,
        },
      });

      // simple rule: 1 point / 1000 steps
      const earned = Math.floor(input.steps / 1000);

      if (earned > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            points: {
              increment: earned,
            },
          },
        });

        await prisma.pointTransaction.create({
          data: {
            userId,
            amount: earned,
            reason: "steps reward",
          },
        });
      }

      return result;
    }),
};