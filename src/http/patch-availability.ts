import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function patchAvailability(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    console.log("patchAvailability");
    try {
        const params = z.object({
            id: z.string(),
        });

        const { id } = params.parse(request.params);

        const body = z.object({
            is_available: z.boolean(),
        });

        const { is_available } = body.parse(request.body);

        console.log(is_available, id);

        const doesDishExist = await prisma.dish.findUnique({
            where: {
                id: id,
            },
        });

        if (!doesDishExist) {
            return reply.status(404).send({ error: "Dish not found" });
        }

        console.log(doesDishExist);

        const result = await prisma.dish.update({
            where: {
                id: id,
            },
            data: {
                is_available: is_available,
            },
        });

        return reply.status(200).send({
            message: "Dish availability updated",
            availability: result.is_available,
        });
    } catch (error) {
        return reply.status(500).send({ error: "Intsdssdss" });
    }
}
