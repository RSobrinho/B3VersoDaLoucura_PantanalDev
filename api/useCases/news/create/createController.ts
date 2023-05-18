import { Request, Response } from "express";
import { CreateUseCase } from "./createUseCase";

export class CreateController {
  constructor(private createUseCase: CreateUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const news = await this.createUseCase.execute({ manual: req.body });

    return res.status(201).json({
      status: "Success",
      message: "News created with successfully!",
      news,
    });
  }
}
