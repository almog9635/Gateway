import { Application, Context, Router } from "@oak/oak";
import { errorHandler } from "./middleware/error.ts";
import { requestLogger } from "./middleware/logger.ts";
import { oakCors } from "@tajpouria/cors";
import userServiceRoutes from "./routes/user-service.ts";
import groupServiceRoutes from "./routes/group-service.ts";
import authenticationRoutes from "./routes/authentication.ts";
import { logger } from "./consts.ts";
import roleServiceRoutes from "./routes/role-service.ts";
import debriefServiceRoutes from "./routes/debrief-service.ts";

logger.info("Deno microservice is running on http://localhost:4000");
const router = new Router();
router
.all("(.*)", (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = { error: "Not Found" };
});

const app = new Application();
app.use(errorHandler);
app.use(requestLogger);
app.use(oakCors({ origin: "http://localhost:5173" }));
app.use(userServiceRoutes.routes());
app.use(groupServiceRoutes.routes());
app.use(authenticationRoutes.routes());
app.use(debriefServiceRoutes.routes());
app.use(roleServiceRoutes.routes());
app.use(router.routes);
app.use(router.allowedMethods());

await app.listen({ port: 4000 });