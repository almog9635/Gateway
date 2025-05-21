import { Router } from "@oak/oak";
import { fetcher, logger, verifyJWTMiddleware } from "../consts.ts";
import { Context } from "@oak/oak";

const taskServiceRoutes = new Router();
taskServiceRoutes
.put("/task/complete/:id", verifyJWTMiddleware, async (ctx: Context) => {
    try{
        const response = await fetcher(ctx.request, 4003);
        ctx.response.status = response.status;
        ctx.response.body = await response.text();
    } catch (error) {
        logger.error(error);
        ctx.response.status = 500;
    }});

export default taskServiceRoutes;