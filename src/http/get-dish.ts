import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function getDish(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params;

    const doesDishExists = await prisma.dish.findUnique({
        where: {
            id: id,
        },
    });

    if (!doesDishExists) {
        return reply.status(404).send({ error: "Dish not found" });
    }

    const dish = {
        id: doesDishExists.id,
        name: doesDishExists.name,
        description: doesDishExists.description,
        price: doesDishExists.price / 100,
        is_available: doesDishExists.is_available,
        category_id: doesDishExists.categoryId,
    };

    return reply.status(200).send(dish);
}
