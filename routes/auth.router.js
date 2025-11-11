import express from 'express';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

authRouter.post('/login', (request, response, next) => {
  response.status(200).send('login 성공 빠바ㅏㅁ!');
});

authRouter.post('/signup', (request, response, next) => {
  response.status(200).send('회 원 가 입 성공 빠바ㅏㅁ!');
});

// 라우터 정의 ....
export default authRouter;
