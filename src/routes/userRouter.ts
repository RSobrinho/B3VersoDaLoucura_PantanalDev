import { Router, Request, Response } from 'express'
import { asyncHandler } from '../errors/handler'
import { signUpController } from '../useCases/user/signUp'
import { signInController } from '../useCases/user/signIn'
import { getController } from '../useCases/user/get'

const router = Router()

router.route('/signup')
  .post(asyncHandler((request: Request, response: Response) => {
    return signUpController.handle(request, response)
  }))

router.route('/signin')
  .post(asyncHandler((request: Request, response: Response) => {
    return signInController.handle(request, response)
  }))

router.route('/')
  .get(asyncHandler((request: Request, response: Response) => {
    return getController.handle(request, response)
  }))
  .get(asyncHandler((request: Request, response: Response) => {
    return getController.handle(request, response)
  }))

export default router
