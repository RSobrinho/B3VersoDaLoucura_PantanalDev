import { Router } from "express";
import { asyncHandler } from "../errors/handler";
// import { getSentimentController } from '../useCases/showAIResults';
import { getSentimentController } from "../useCases/showAIResults/";

const router = Router();

asyncHandler(
  router.get("/", (req, res) => {
    // res.status(200).render('base')
    return getSentimentController.handle(req, res);
    // return getSentiment.handle(req, res)
  })
);

export default router;
