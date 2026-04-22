import prisma from "@my-better-t-app/db";
import z from "zod";

import { publicProcedure, protectedProcedure } from "../index";
import { Rarity } from "../../../db/prisma/generated/enums";

// Helper function to shuffle array for getFeatured endpoint using the Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // Create a copy of the array using the spread operator ...
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]; // using ! to assert that the values are not undefined
    }
    return shuffled;
}

export const insectRouter = {
    getAll: publicProcedure.handler(async () => { 
        return await prisma.insect.findMany({
            orderBy:{
                id: "asc",
            },
        });
    }),

    getFeatured: publicProcedure.handler(async () => {
        const featured = await prisma.insect.findMany({
            where: {
                featured: true,
            },
        });
        // Shuffle and return up to 4 insects
        const shuffled = shuffleArray(featured);
        return shuffled.slice(0, 4);
    }),

    create: publicProcedure
    .input(z.object({ name: z.string().min(1), sci_name: z.string().min(1) }))
    .handler(async ({input}) =>    {
        return await prisma.insect.create({
            data: {
                name: input.name,
                Sci_Name: input.sci_name,
                featured: true,
                rarity: Rarity.Commun,
            }
        
        })
    } /* CREATE A RETIRER*/ ,

    // getUserCollection à faire pour récupérer les insectes d'un utilisateur (collection).
    
    )
}