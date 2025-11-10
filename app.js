// 기본적인 router 형태
import express, { response } from 'express'; // express 모듈 가져오기, express 함수 가져오기

const app = express();

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

// --------------------------------
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
// 도메인과 도메인을 제외한 부분에서 특정한 경로가 파라미터로써 쓸 경우가 있다.
// 'Request.params'를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId)); //아무리 우리가 200 과 같은 숫자를 적어도 type 형태는 string 형태이다.
  response.status(200).send(postId);
})
;
// --------------------------------

// 대체 라우트 (정의할 라우터를 다 쓰고 가장 마지막에 쓴다/미들웨어랑 관련이 있다.)
app.use((request, response, next) => {
  response.status(404).send('찾을 수 없는 페이지 입니다.');
})

// 서버를 주어진 포트에서 시작 (유저의 요청을 기다리겠다.)
app.listen(3000, () => {
  console.log(`3000포트에서 리스닝`);
});
