import {TRPCError} from "@trpc/server";
import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "../trpc";

export const user = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        cedula: z.string(),
        email: z.string(),
        name: z.string(),
        password: z.string(),
        apellido: z.string(),
      }),
    )
    .mutation(async ({input, ctx}) => {
      const {cedula, email, name, password, apellido} = input;
      const userByEmail = await ctx.prisma.user.findUnique({
        where: {email},
      });

      if (userByEmail) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El correo ya existe",
        });
      }

      return await ctx.prisma.user.create({
        data: {
          cedula,
          email,
          name,
          apellido,
          contrasena: password,
        },
      });
    }),
  byId: publicProcedure.input(z.object({id: z.string()})).query(async ({input, ctx}) => {
    const {id} = input;
    const user = await ctx.prisma.user.findUnique({
      where: {id},
    });

    if (!user) {
      throw new Error("No se encontró el usuario, por favor intente de nuevo");
    }

    return {
      success: true,
      user,
    };
  }),
});
