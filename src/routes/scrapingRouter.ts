import { Router, Request, Response } from "express";
import { asyncHandler } from "../errors/handler";
import { getController } from "../useCases/scraping/get";
import { createController } from "../useCases/scraping/create";
import { updateController } from "../useCases/scraping/update";
import { deleteController } from "../useCases/scraping/delete";

const router = Router();

router.route("/").post(
  asyncHandler((request: Request, response: Response) => {
    return createController.handle(request, response);
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
