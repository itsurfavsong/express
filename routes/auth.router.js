import express from 'express';
import loginValidator from '../app/middlewares/validations/validators/login.validator.js';
import { validatorHandler } from '../app/middlewares/validations/validations-handler.js';
import registarationValidator from '../app/middlewares/validations/validators/registaration.validator.js';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

authRouter.post('/login', loginValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('login 성공 빠바ㅏㅁ!');
});

authRouter.post('/signup', registarationValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('회 원 가 입 성공 빠바ㅏㅁ!');
});

// 라우터 정의 ....
export default authRouter;
