import { Context, Router } from "@oak/oak";
import { fetcher, logger, verifyJWTMiddleware } from "../consts.ts";

const roleRouter = new Router();
roleRouter
    .get("/roles", verifyJWTMiddleware, async (ctx: Context) =>{
        try{
            const response = await fetcher(ctx.request, 4001);
            ctx.response.status = response.status;
            ctx.response.body = await response.text();
        } catch(error){
            logger.error(error);
            ctx.response.status = 500;
        }

    });

export default roleRouter;