import { Request, Response } from 'express'
import { CreateUseCase } from './createUseCase'

export class CreateController {
  constructor (private createUseCase: CreateUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    const newUser = await this.createUseCase.execute(req.body)

    return res.status(201).json({ status: 'Success', message: 'User signed up successfully', newUser })
  }
}
