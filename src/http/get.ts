import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const dishes = await prisma.dish.findMany({
        include: {
            category: true,
        },
        orderBy: {
            is_available: "desc",
        },
    });

    dishes.forEach((dish) => {
        dish.price = dish.price / 100;
    });

    return reply.status(200).send(dishes);
}
