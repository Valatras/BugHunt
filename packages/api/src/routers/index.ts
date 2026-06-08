import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "../index";
import { todoRouter } from "./todo";
import { insectRouter } from "./insect";
import { userRouter } from "./user";
import { podometerRouter } from "./podometer";
import { userInsectRouter, type UserInsectRouter } from "./userInsect";
import { Rarity } from "../../../db/prisma/generated/enums";


export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  todo: todoRouter,
  insect: insectRouter,
  user: userRouter,
  userInsect: userInsectRouter,
  podometer: podometerRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
