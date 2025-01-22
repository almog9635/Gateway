import { Router } from "@oak/oak";
import { fetcher } from "../consts.ts";
import { Context } from "@oak/oak";

const authenticationRoutes = new Router();

authenticationRoutes
    .post("/login", async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4002);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    })
    .post("/refresh-token",  async (ctx: Context) => {
      const response = await fetcher(ctx.request, 4002);
      ctx.response.status = response.status;
      ctx.response.body = await response.text();
    })
    .post("/logout", async (ctx: Context) => {
        const response = await fetcher(ctx.request, 4002);
        ctx.response.status = response.status;
        ctx.response.body = response.body;
    });
  
export default authenticationRoutes;

