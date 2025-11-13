// 기본적인 router 형태
import express from 'express'; // express 모듈 가져오기, express 함수 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';
import { errorHandler } from './app/middlewares/errors/error-handler.js';
import eduRouter from './routes/edu.router.js';

const app = express();
app.use(express.json()); // Json으로 요청이 올 경우 파싱 처리
// get Middleware set
app.use(eduTest); // 커스텀 미들웨어 **전역으로 등록**

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/', (request, response, next) => {
  response.status(200).send('안녕 익스프레스 나는 보미야');
});

// 클라이언트가 'api/hi' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('나 기억하니? 포스트 익스프레스야');
});

// 클라이언트가 'api/hi' 경로로 PUT 요청을 보낼 때 실행되는 Router (단일 레코드)
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('야이놈아 수정이다 익스프레스!');
});

// 클라이언트가 'api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('삭제한데이 익스프레스!');
});

// ----------------------------------------------------------------------------------------------------------------------------------
// Parameters
// ----------------------------------------------------------------------------------------------------------------------------------
// Query Parameter 제어
// Request.query 프로퍼티를 통해서 접근 가능하다.
// 모든 값을 string으로 받기 때문에 주의가 필요하다.
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = request.query.age;
  console.log(name, age);

  response.status(200).send(params);
});

// Segment Parameter
// 단순 몇개 안되는 1-2개 정도의 값만 필요하면 세그먼트 ㄱ
// 도메인과 도메인을 제외한 부분에서 특정한 경로가 파라미터로써 쓸 경우가 있다.
// 'Request.params'를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId)); //아무리 우리가 200 과 같은 숫자를 적어도 type 형태는 string 형태이다.
  response.status(200).send(postId);
})
;

// JSON 요청 제어
// 인스턴스 -> const form = new FormData();
// 추가해줘야되는 점이 있다.
// 데이터가 많아진다? 그러면 json으로 받는다.
// 'Request.body'를 통해서 접근 가능 (** express.json() 추가 필요 **)
app.post('/api/hi', (request, response, next) => {
  const {account, password, name} = request.body;
  // const account = request.body.account; 하나하나 다 받아와도 되고 district 형태로 받아와도 괜찮다.
  response.status(200).send({account, password, name})
});

// ----------------------------------------------------------------------------------------------------------------------------------
// 라우트 그룹 (개발자 마음)
// ----------------------------------------------------------------------------------------------------------------------------------
// 유지보수를 위해 각 기능별로 나눈다 and 라우트를 모듈로 나누고 그룹핑하여 관리하는 곳이다.
app.use('/api', authRouter);
// '/api' 여기에서 설정해둔다는 뜻은 authRouter 관련된 것들은 다 '/api' 이 주소를 가져온다는 뜻이다.
// 기능명까지 prefix로 들고 올 수 있다.

app.use('/api/users', eduUsersTest, usersRouter);
// 만약 uesrsRouter에 모든 라우터들이 미들웨어를 쓴다? 그러면 여기다가 추가 할 수 있음

// 에러 테스트용 라우터
app.get('/error', (request, response, next) => {
  // throw를 통해서 에러 핸들링 처리도 가능. but 비동기 처리 안에서 throw를 하면 안된다. 처리가 안된다.
  // (자바스크립트의 비동기 처리 방법때문임 - 비동기 처리 내부에서는 사용하면 서버가 죽는다.) 자바스크립트에서는 통신을 한다 -> 비동기 처리라서 자바스크립트에서는 비동기 처리가 매우 많다.
  // 파일 작성, 읽어오는 거 비동기 처리 (자바스크립트) 그래서 비동기 처리와 throw는 절연수준임. 그래서 next를 주로 쓴다.
  // throw new Error('예외 발생 with Throw')

  // 비동기 처리 내부에서는 반드시 **next(error)**를 이용해야 서버 crashed가 일어나지 않는다.
  next(new Error('예외 발생'));
});

app.use(eduRouter);


// ----------------------------------------------------------------------------------------------------------------------------------
// 대체 라우트 (정의할 라우터를 다 쓰고 **가장 마지막**에 쓴다/미들웨어랑 관련이 있다.)
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01'
    , msg: '찾을 수 없는 페이지 입니다.'
  });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// Error Handler 등록
// ----------------------------------------------------------------------------------------------------------------------------------
app.use(errorHandler);

// 서버를 주어진 포트에서 시작 (유저의 요청을 기다리겠다.)
app.listen(3000, () => {
  console.log(`3000포트에서 리스닝`);
});
