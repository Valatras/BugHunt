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

  // GET DETAILS (authenticated collection modal)
  getDetails: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      const insect = await prisma.insect.findUnique({
        where: { id: input.id },
        include: {
          userInsects: {
            where: {
              userId,
            },
            select: {
              quantity: true,
            },
          },
        },
      });

      if (!insect) {
        throw new Error("Insect not found");
      }

      return {
        ...insect,
        owned: insect.userInsects.length > 0,
        quantity: insect.userInsects[0]?.quantity ?? 0,
      };
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

  
  // GET USER COLLECTION (for each insect, check if user has it in collection)
  getCollection: protectedProcedure.handler(async ({ context }) => {
  const userId = context.session.user.id;

  const insects = await prisma.insect.findMany({
    orderBy: { id: "asc" },
    include: {
      userInsects: {
        where: { userId },
        select: {
          quantity: true,
        },
      },
    },
  });

  return insects.map((insect) => {
    const owned = insect.userInsects.length > 0;
    const quantity = insect.userInsects[0]?.quantity ?? 0;

    return {
        id: insect.id,
        name: insect.name,
        sciName: insect.sciName,
        rarity: insect.rarity,
        featured: insect.featured,
        description: insect.description,
        imageKey: insect.imageKey,

        owned,
        quantity,
    };
  });
}),
};
