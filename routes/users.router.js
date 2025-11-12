import express from 'express';
import db from '../app/models/index.js';
// import pool from '../db/my-db.js';

const { sequelize, Employee } = db;

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
});

// 특정 처리에 미들웨어를 삽입할 수 있다. (파라미터로 추가하면 된다)
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    // ----------------------------------------------------------------------------------------------------
    // Sequelize로 DB연동
    // ----------------------------------------------------------------------------------------------------
    const result = await Employee.findByPk(id);
    return response.status(200).send(result);

    // ----------------------------------------------------------------------------------------------------
    // mysql2로 DB연동
    // ----------------------------------------------------------------------------------------------------
    // // Query 작성
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE
    //     emp_id = ?
    // `;
    // // prepared statement
    // const [result] = await pool.execute(sql, [id]);

    // return response.status(200).send(result);
  } catch(error) {
    next(error);
  }
});

usersRouter.delete('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 삭제 완료');
});

// 라우터 정의 ....
export default usersRouter;

