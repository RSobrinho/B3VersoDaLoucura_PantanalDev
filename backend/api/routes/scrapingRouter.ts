import { Router, Request, Response } from "express";
import { asyncHandler } from "../errors/handler";
import { createController } from "../useCases/scraping/create";

const router = Router();

router.route("/").post(
  asyncHandler((request: Request, response: Response) => {
    return createController.handle(request, response);
  })
);

export default router;
