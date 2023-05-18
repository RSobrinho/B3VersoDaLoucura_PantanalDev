import { Request, Response } from 'express'
import { GetUseCase } from './getUseCase'

export class GetController {
  constructor (private getUseCase: GetUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    const user = await this.getUseCase.execute(req.user)

    return res.status(201).json({ status: 'Success', message: 'User data got successfully', user })
  }
}
