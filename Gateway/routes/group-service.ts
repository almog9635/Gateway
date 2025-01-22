import { Router } from "@oak/oak";
import { fetcher, verifyJWTMiddleware } from "../consts.ts";
import { Context } from "@oak/oak";

const groupServiceRoutes = new Router();

groupServiceRoutes
    .get("/groups", verifyJWTMiddleware, async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4001);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    })
    .all("/group/:path*", verifyJWTMiddleware, async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4001);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    });
  
export default groupServiceRoutes;

