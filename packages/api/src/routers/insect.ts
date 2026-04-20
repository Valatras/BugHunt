import prisma from "@my-better-t-app/db";
import z from "zod";

import { publicProcedure, protectedProcedure } from "../index";

// Helper function to shuffle array for getFeatured endpoint
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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
                Sci_Name: input.sci_name
            }
        
        })
    } /* CREATE A RETIRER*/ 
    
    )
}