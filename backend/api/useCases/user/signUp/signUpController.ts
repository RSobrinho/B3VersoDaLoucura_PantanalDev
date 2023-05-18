import { Request, Response } from 'express'
import { SignUpUseCase } from './signUpUseCase'

export class SignUpController {
  constructor (private signUpUseCase: SignUpUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    const newUser = await this.signUpUseCase.execute(req.body)

    return res.status(201).json({ status: 'Success', message: 'User signed up successfully', newUser })
  }
}
