import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category_id: z.string(),
        is_available: z.boolean(),
    });

    const { name, description, price, category_id, is_available } =
        schema.parse(request.body);

    const id = request.params.id;

    const doesDishExist = await prisma.dish.findUnique({
        where: {
            id: id,
        },
    });
    if (!doesDishExist) {
        return reply.status(404).send({ message: "Dish not found" });
    }
    const dish = await prisma.dish.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            description: description,
            price: price * 100,
            categoryId: category_id,
            is_available: is_available,
        },
    });

    return reply.status(200).send(dish);
}
