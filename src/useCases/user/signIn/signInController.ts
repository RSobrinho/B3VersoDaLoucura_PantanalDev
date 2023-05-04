import { Request, Response } from 'express'
import { SignInUseCase } from './signInUseCase'

export class SignInController {
  constructor (private signInUseCase: SignInUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    await this.signInUseCase.execute(req.body)

    return res.status(200).json({ status: 'Success', message: 'User signed in successfully' })
  }
}
