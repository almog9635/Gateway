import { Logger } from "./logger/logger.ts";
import { Context, Request as OakRequest } from "@oak/oak";

export const logger = Logger.getLogger();

export const fetcher = async (req: OakRequest, port: number) => {
  try{    
    if(req.hasBody === false || req.method === "DELETE") {
      
      return await fetch(`http://localhost:${port}${req.url.pathname}`, {
          method: req.method,
          headers: req.headers,
      });
    }

    return await fetch(`http://localhost:${port}${req.url.pathname}`, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(await req.body.json()),
    });
  } catch(error){
    logger.error(error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const verifyJWTMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  try{
    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };

      return;
    }
  
    const response = await fetch("http://localhost:4002/verify-token", {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    });
  
    if (response.status !== 200) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };

      return;
    }
  
    await next();
  } catch (error) {
    logger.error(error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
  
};
