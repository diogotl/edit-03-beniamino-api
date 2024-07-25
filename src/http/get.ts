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

    function getImage(categoryTitle: string) {
        const url = "https://beniamino-api.up.railway.app";

        if (categoryTitle === "Entrada") {
            return `${url}/public/appetizer.jpg`;
        } else if (categoryTitle === "Prato Principal") {
            return `${url}/public/entree.png`;
        } else if (categoryTitle === "Sobremesa") {
            return `${url}/public/dessert.jpg`;
        } else if (categoryTitle === "Bebida") {
            return `${url}/public/drink.jpg`;
        } else {
            return `${url}/public/pizza.png`;
        }
    }

    const newDishes = dishes.map((dish) => {
        return {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            is_available: dish.is_available,
            price: dish.price / 100,
            category: {
                id: dish.category.id,
                title: dish.category.title,
            },
            avatar: getImage(dish.category.title),
        };
    });

    return reply.status(200).send(newDishes);
}
