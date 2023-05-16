import { Router, Request, Response } from "express";
import { asyncHandler } from "../errors/handler";
import { getController } from "../useCases/news/get";
import { createController } from "../useCases/news/create";
import { updateController } from "../useCases/news/update";
import { deleteController } from "../useCases/news/delete";

const router = Router();

router
  .route("/")
  .post(
    asyncHandler((request: Request, response: Response) => {
      return createController.handle(request, response);
    })
  )
  .get(
    asyncHandler((request: Request, response: Response) => {
      return getController.handle(request, response);
    })
  );

router
  .route("/:id")
  .patch(
    asyncHandler((request: Request, response: Response) => {
      return updateController.handle(request, response);
    })
  )
  .delete(
    asyncHandler((request: Request, response: Response) => {
      return deleteController.handle(request, response);
    })
  );

export default router;
