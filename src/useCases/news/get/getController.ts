import { Request, Response } from "express";
import { GetUseCase } from "./getUseCase";

export class GetController {
  constructor(private getUseCase: GetUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const queryParams = { ...req.query };

    const params = {
      _id: queryParams.id || null,
      link: queryParams.link || null,
      initial_date: queryParams.initial_date || null,
      final_date: queryParams.final_date || null,
      sentiment: queryParams.sentiment || null,
    };

    const news = await this.getUseCase.execute(params);

    return res
      .status(200)
      .json({ status: "Success", message: "News data got successfully", news });
  }
}
