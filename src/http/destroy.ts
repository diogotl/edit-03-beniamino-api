import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequestError } from "../errors/bad-request-error";

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
    const params = z.object({
        id: z.string(),
    });

    const { id } = params.parse(request.params);

    const doesDishExist = await prisma.dish.findFirst({
        where: {
            id: id,
        },
    });

    if (!doesDishExist) {
        throw new BadRequestError("Dish not found");
    }

    await prisma.dish.delete({
        where: {
            id: id,
        },
    });

    return reply.status(203).send({
        message: "Dish deleted",
    });
}
