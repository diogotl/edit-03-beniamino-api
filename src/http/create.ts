import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        price: z.number().min(0.01),
        category_id: z.string().uuid(),
        is_available: z.boolean({
            required_error: "required",
        }),
    });

    const { name, description, price, category_id, is_available } =
        schema.parse(request.body);

    const doesCategoryExists = await prisma.category.findUnique({
        where: {
            id: category_id,
        },
    });

    if (!doesCategoryExists) {
        return reply.status(404).send({
            message: "Validation error",
            error: {
                category_id: ["Category not found"],
            },
        });
    }

    const dish = await prisma.dish.create({
        data: {
            name: name,
            description: description,
            price: price * 100,
            categoryId: category_id,
            is_available: is_available,
        },
    });

    const dishWithCategory = await prisma.dish.findUnique({
        where: {
            id: dish.id,
        },
        include: {
            category: true,
        },
    });

    const dishWithCategoryAndPrice = {
        ...dishWithCategory,
        price: dishWithCategory!.price / 100,
    };

    return reply.code(201).send({
        dish: dishWithCategoryAndPrice,
    });
}
