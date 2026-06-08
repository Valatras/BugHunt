import prisma from "@my-better-t-app/db";
import z from "zod";
import { publicProcedure, protectedProcedure } from "../index";
import { Rarity } from "../../../db/prisma/generated/enums";

// -------------------------
// utils
// -------------------------
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

// -------------------------
// router
// -------------------------
export const insectRouter = {
  // GET ALL
  getAll: publicProcedure.handler(async () => {
    return prisma.insect.findMany({
      orderBy: { id: "asc" },
    });
  }),

  // GET FEATURED (dashboard)
  getFeatured: publicProcedure.handler(async () => {
    const featured = await prisma.insect.findMany({
      where: { featured: true },
    });

    return shuffleArray(featured).slice(0, 4);
  }),

  // GET BY ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return prisma.insect.findUnique({
        where: { id: input.id },
      });
    }),

  // FILTER BY RARITY
  getByRarity: publicProcedure
    .input(z.object({ rarity: z.nativeEnum(Rarity) }))
    .handler(async ({ input }) => {
      return prisma.insect.findMany({
        where: { rarity: input.rarity },
        orderBy: { id: "asc" },
      });
    }),

  // CREATE (ADMIN ONLY → logique réaliste)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        sciName: z.string().min(1),
        rarity: z.nativeEnum(Rarity),
        featured: z.boolean().default(false),
      })
    )
    .handler(async ({ input }) => {
      return prisma.insect.create({
        data: {
          name: input.name,
          sciName: input.sciName,
          rarity: input.rarity,
          featured: input.featured,
        },
      });
    }),
};