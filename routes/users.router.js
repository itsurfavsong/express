import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환

usersRouter.get('/:id', eduUsersTest, (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
});

// 특정 처리에 미들웨어를 삽입할 수 있다. (파라미터로 추가하면 된다)

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});

usersRouter.delete('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 삭제 완료');
});

// 라우터 정의 ....
export default usersRouter;

