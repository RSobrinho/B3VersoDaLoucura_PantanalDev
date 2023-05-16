import { Request, Response } from "express";
import { UpdateUseCase } from "./updateUseCase";

export class UpdateController {
  constructor(private updateUseCase: UpdateUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const news = await this.updateUseCase.execute(req.params.id, req.body);

    return res.status(200).json({
      status: "Success",
      message: "News updated with successfully!",
      news,
    });
  }
}
