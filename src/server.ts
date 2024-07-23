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

const app = fastify();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.setErrorHandler(errorHandler);

app.get("/categories", getCategories);
app.get("/dishes", get);
app.post("/dishes", create);
app.get("/dishes/:id", getDish);
app.put("/dishes/:id", update);
app.patch("/dishes/:id", patchAvailability);
app.delete("/dishes/:id", destroy);

app.listen({
    host: "0.0.0.0",
    port: Number(env.PORT),
}).then(() => {
    console.log(`HTTP Server Running! 🚀 ${env.PORT}`);
});
