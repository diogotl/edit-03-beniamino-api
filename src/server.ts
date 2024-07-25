import cors from "@fastify/cors";
import { fastify } from "fastify";
import { errorHandler } from "./error-handler";
import { create } from "./http/create";
import { destroy } from "./http/destroy";
import { get } from "./http/get";
import { getCategories } from "./http/get-categories";
import { update } from "./http/update";
import { patchAvailability } from "./http/patch-availability";
import { getDish } from "./http/get-dish";
import { env } from "process";
import path from "node:path";
import fastifyStatic from "@fastify/static";

const app = fastify();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/public/", // URL prefix for accessing static files
});

app.setErrorHandler(errorHandler);

app.get("/categories", getCategories);
app.get("/dishes", get);
app.post("/dishes", create);
app.get("/dishes/:id", getDish);
app.put("/dishes/:id", update);
app.patch("/dishes/:id", patchAvailability);
app.delete("/dishes/:id", destroy);

const port = Number(env.PORT || 3333);

app.listen({
    host: "0.0.0.0",
    port,
}).then(() => {
    console.log(`HTTP Server Running!  ${port} 🚀`);
});
