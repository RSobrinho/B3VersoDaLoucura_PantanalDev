import { Request, Response } from "express";
import { DeleteUseCase } from "./deleteUseCase";

export class DeleteController {
  constructor(private deleteUseCase: DeleteUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const news = await this.deleteUseCase.execute({ _id: req.params.id });

    return res.status(204).json({
      status: "Success",
      message: "News deleted with successfully!",
    });
  }
}
