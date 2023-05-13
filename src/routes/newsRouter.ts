import { Router, Request, Response } from "express";
import { asyncHandler } from "../errors/handler";
import { createController } from "../useCases/news/create";
import { updateController } from "../useCases/news/update";

const router = Router();

router.route("/").post(
  asyncHandler((request: Request, response: Response) => {
    return createController.handle(request, response);
  })
);

router.route("/:id").patch(
  asyncHandler((request: Request, response: Response) => {
    return updateController.handle(request, response);
  })
);

export default router;
