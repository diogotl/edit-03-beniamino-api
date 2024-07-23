import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequestError } from "./errors/bad-request-error";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            error: error.flatten().fieldErrors,
        });
    }

    if (error instanceof BadRequestError) {
        return reply.status(400).send({
            message: error.message,
        });
    }

    return reply.status(500).send({
        message: "Internal server error",
    });
};
