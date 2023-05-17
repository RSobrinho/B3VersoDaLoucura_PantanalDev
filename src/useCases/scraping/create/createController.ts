import { Request, Response } from "express";
import { CreateUseCase } from "./createUseCase";
import { ValidationError } from "../../../errors/validationError";

export class CreateController {
  constructor(private createUseCase: CreateUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const params = {
      initial_date: req.body.initial_date || null,
      final_date: req.body.final_date || null,
      link: req.body.link || null,
    };

    const scraping = await this.createUseCase.execute({
      initial_date: params.initial_date,
      final_date: params.final_date,
      link: params.link,
    });

    return res.status(201).json({
      status: "Success",
      message: "Scraping created with successfully!",
      scraping,
    });
  }
}
