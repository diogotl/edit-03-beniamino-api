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
    port: 3333,
}).then(() => console.log(`Server is running on port 3333`));
