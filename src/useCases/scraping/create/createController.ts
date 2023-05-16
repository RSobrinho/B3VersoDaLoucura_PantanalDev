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

    let scraping = {};

    if (params.link) {
      // Fazer scraping direto do link
    } else if ((params.initial_date, params.final_date)) {
      // Fazer scraping das news pelas datas e depois o direto pelos links
      scraping = await this.createUseCase.execute({
        initial_date: params.initial_date,
        final_date: params.final_date,
      });
    } else {
      throw new ValidationError("Nenhum parametro válido foi informado!");
    }

    return res.status(201).json({
      status: "Success",
      message: "Scraping created with successfully!",
      scraping,
    });
  }
}
