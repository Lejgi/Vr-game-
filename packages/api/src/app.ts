import cors from "cors";
import express, {
  type ErrorRequestHandler,
  type Express,
  type Request,
  type Response,
} from "express";
import { recipesRouter } from "./routes.js";

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, service: "kucharka-api", locale: "cs-CZ" });
  });

  app.get("/", (_req: Request, res: Response) => {
    res.json({
      name: "Kuchařka MR API",
      version: "0.1.0",
      endpoints: {
        health: "GET /health",
        recipes: "GET /api/recipes",
        recipe: "GET /api/recipes/:idOrSlug",
        sync: "GET /api/recipes/sync?since=ISO",
        create: "POST /api/recipes",
        update: "PATCH /api/recipes/:idOrSlug",
        delete: "DELETE /api/recipes/:idOrSlug",
      },
    });
  });

  app.use("/api/recipes", recipesRouter);

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = typeof err?.status === "number" ? err.status : 500;
    const message = err instanceof Error ? err.message : "Neočekávaná chyba";
    if (status >= 500) {
      console.error(err);
    }
    res.status(status).json({ error: message });
  };

  app.use(errorHandler);
  return app;
}
