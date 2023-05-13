import { Request, Response } from 'express'
import { GetUseCase } from './getUseCase'

export class GetController {
  constructor (private getUseCase: GetUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    const news = await this.getUseCase.execute()

    return res.status(201).json({ status: 'Success', message: 'News data got successfully', news })
  }
}
