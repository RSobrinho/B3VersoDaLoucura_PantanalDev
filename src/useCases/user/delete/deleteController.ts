import { Request, Response } from 'express'
import { DeleteUseCase } from './deleteUseCase'

export class DeleteController {
  constructor (private deleteUseCase: DeleteUseCase) {}
  async handle (req: Request, res: Response): Promise<Response> {
    await this.deleteUseCase.execute(req.user)

    return res.status(204).json({ status: 'Success', message: 'User deleted successfully' })
  }
}
