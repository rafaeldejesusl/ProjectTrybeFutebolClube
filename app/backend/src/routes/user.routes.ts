import { Router } from 'express';
import { UserFactory } from '../factory';
import { validateEmail, validatePassword, validateToken } from '../middlewares/user.middlewares';

const userRouter = Router();

userRouter.post('/login', validateEmail, validatePassword, (req, res, next) => {
  UserFactory().login(req, res, next);
});

userRouter.get('/login/validate', validateToken, (req, res, next) => {
  UserFactory().loginValidate(req, res, next);
});

export default userRouter;
