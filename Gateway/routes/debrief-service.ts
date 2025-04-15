import { Router } from "@oak/oak";
import { fetcher, verifyJWTMiddleware } from "../consts.ts";
import { Context } from "@oak/oak";

const debriefServiceRoutes = new Router();

debriefServiceRoutes
    .get("/debriefs", verifyJWTMiddleware, async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4003);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    })
    .all("/debrief/:path*", verifyJWTMiddleware, async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4003);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    });
  
export default debriefServiceRoutes;