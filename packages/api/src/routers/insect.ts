import prisma from "@my-better-t-app/db";
import z from "zod";

import { publicProcedure, protectedProcedure } from "../index";

export const insectRouter = {
    getAll: publicProcedure.handler(async () => { 
    return await prisma.insect.findMany({
        orderBy:{
            id: "asc",
        },
    });
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