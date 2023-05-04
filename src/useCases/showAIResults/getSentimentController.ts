// import { Response, Request } from 'express'
// import { GetSentimentUseCase } from './getSentimentUseCase'

// export class GetSentimentController {
//   constructor (private getSentimentUseCase: GetSentimentUseCase) {}

//   async handle (req: Request, res: Response): Promise<Response> {
//     const sentiment = await this.getSentimentUseCase.execute(req.body.text)

//     return res.status(201).json({ status: 'Success', message: `${sentiment}` })
//   }
// }
