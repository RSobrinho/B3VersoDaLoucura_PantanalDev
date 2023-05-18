import { Router } from "express";
import { asyncHandler } from "../errors/handler";

const router = Router();

asyncHandler(
  router.get("/", (req, res) => {
    // res.status(200).render('base')
    res.send("Hello World!");
    // return getSentiment.handle(req, res)
  })
);

export default router;
