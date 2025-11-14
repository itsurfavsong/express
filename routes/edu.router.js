import express from 'express';
import db from '../app/models/index.js';
import { Op } from 'sequelize';
import dayjs from 'dayjs';

const { sequelize, Employee, TitleEmp, Title } = db; // 우리가 만든 sequelize 변수임

const eduRouter = express.Router();

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    const fireDate = request.query.date;

    let result = null;

    // --------------------------------------------------------------------------------------------------
    // 평문으로 실행하고 싶을 경우
    // --------------------------------------------------------------------------------------------------
    // const sql = `
    // SELECT
    //   *
    // FROM
    //   employees
    // WHERE
    //   fire_at >= ?`
    //   ;

    // result = await sequelize.query(
    //   sql,
    //   {
    //     replacements: [fireDate],
    //     type: sequelize.QueryTypes.SELECT // 평문이랑 같이 꼭 써줘야하는 놈
    //   }
    // );

    // --------------------------------------------------------------------------------------------------
    // Model Method (쿼리 실행 관련)
    // --------------------------------------------------------------------------------------------------
    // 1. findAll() : 전체 조회 (조건 설정 가능)
    // 쿼리문 -> SELECT emp_id, name, birth FROM employees WHERE emp_id =< 100;
    // result = await Employee.findAll({ // SELECT할때 쓰인다 주로, 그리고 배열
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정 (SELECT 절)
    //   where: {
    //     empId: {
    //       [Op.lte]: 100 // empId가 =< 100
    //       // [Op.between]: [50, 100]
    //     }
    //   }
    // });

    // 2. findOne() : 조건에 맞는 첫 번째 레코드 조회
    // 쿼리문 -> SELECT emp_id, name, birth FROM employees WHERE emp_id =< 100 limit 1;
    // result = await Employee.findOne({ // 딱 1개만 오기 때문에 object 객체 이다.
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정 (SELECT 절)
    //   where: {
    //     empId: {
    //       [Op.lte]: 100 // empId가 =< 100
    //       // [Op.between]: [50, 100]
    //     }
    //   }
    // });

    // 3. findByPk(id, options) : PK 기준 단일 레코드 조회
    // 쿼리문 -> SELECT emp_id, name FROM employees WHERE emp_id = 50000;
    // result = await Employee.findByPk(50000, {
    //   attributes: ['empId', 'name']
    // });

    // 4. count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)
    // SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL;
    // result = await Employee.count({
    //   paranoid: false,
    // });

    // result = await Employee.max('empId'); // 이게 group by는 아님..

    // 5. create(values, options): 새 레코드 생성, ORM이라서 create해서 result에 넣고 넣은 데이터를 바로 전달할 수 있다.
    // ORM을 안쓰면 숫자로 반환한다.
    // result = await Employee.create({
    //   // 'name', birth, gender, hire_at
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   hireAt: dayjs().format('YYYY-MM-DD'),
    //   gender: 'F'
    // });

    // 6. update(values, options) : 기존 레코드 수정 (영향받은 레코드 수 반환)
    // UPDATE employees SET name = "사자" WHERE emp_id >= 100008;
    // result = await Employee.update(
    //   {
    //   name: '사자'
    //   }
    //   , {
    //     where: {
    //       empId: {
    //         [Op.gte]: 100008
    //       }
    //     }
    //   }
    // );

    // 7. save() : 모델 인스턴스를 기반으로 레코드 생성 및 수정. (insert 기능와 update 기능을 왔다갔다한다.)
    // 7-1. update 데이터 수정 기능일 때 ->
    // const employee = await Employee.findByPk(100008); // When it starts, original data and changed data get kept separately
    // employee.name =  '둘리';
    // employee.birth = '2024-04-01';
    // result = await employee.save(); // When it finishes, original data transfers to changed data.

    // 위 아래의 Employee는 불러오는 주소값이 달라서 다른 아이들이다.

    // 7-2. insert 데이터 생성 기능일 때 ->
    // const employee = Employee.build(); // 빈 모델 객체 인스턴스
    // employee.name = '또치';
    // employee.birth = '1982-11-23';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // result = await employee.save();

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 8. destroy(options) : 조건에 맞는 레코드 삭제
    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // result = await Employee.destroy({
    //   where: {
    //     empId: 100008
    //   },
    //   // paranoid: false, 여기서 안먹힘
    //   force: true // hard delete는 이렇게 써야됨. 모델에 `paranoid: true`일 경우에도, 물리적 삭제를 위한 옵션.
    // });

    // // -----------------------------------------------------------------------------------------------------------------------------------------
    // // 9. restore(options) : Soft Delete 된 레코드를 복원
    // // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // result = await Employee.restore(
    //   {
    //     where:{
    //       empId: 100011
    //     }
    //   }
    // );

    // --------------------------------------------------------------------------------------------
    // 예제 1번
    // --------------------------------------------------------------------------------------------
    // 이름이 '강가람'이고 성별이 여자 또는, '신서연'인 사원 정보 조회
    // result = await Employee.findAll(
    //   {
    //     attributes: ['empId', 'name', 'gender'],
    //     where: {
    //       [Op.or]: [  // [Op.and] AND 절 입니다.
    //         {
    //           name: '강가람'
    //         },
    //         {
    //           name: '신서연'
    //         }
    //       ],
    //     } // and 생략가능함.
    //   }
    // );
    // --------------------------------------------------------------------------------------------
    // 예제 2번
    // --------------------------------------------------------------------------------------------
    // 성별이 여자, 그리고 이름이 '강가람 OR '신서연'인 사원 정보 조회
    // result = await Employee.findAll(
    //   {
    //     attributes: ['empId', 'name', 'gender'],
    //     where: {
    //       gender: 'F' ,
    //       [Op.or]: [
    //         { name: '강가람' },
    //         { name: '신서연' }
    //       ]
    //     } // 어차피 이 구문에서 ','으로만 해도 and가 들어간다. 그래서 [Op.and] 굳이 써줄 필요가 없다.
    //   }
    // )

    // result = await Employee.findAll({
    //   where: {
    //     // empId: {
    //     //   // [Op.between]: [1, 100], 이의 반대로는 [Op.notBetween] 이렇게 쓸 수 있다.
    //     //   [Op.in]: [1, 2, 3] // Op.notIn 이 1, 2, 3번 빼고 다 가지고 오고 Op.in은 반대이다.
    //     // },
    //     name: {
    //       [Op.like]: '%가람' // 혹은 Op.iLike 는 대소문자 무시하고 검색한다.
    //     },
    //     fireAt: {
    //       [Op.is]: null // 이의 반대는 [Op.not]: null 라는 형태로 쓸 수 있다.
    //     }
    //   }
    // });

    // // 로그 저장 처리
    // result = await Employee.findAll(
    //   {
    //     where: {
    //       empId: {
    //         [Op.gte]:10000
    //       }
    //     },
    //     order: [
    //       ['name', 'ASC'],
    //       ['birth', 'DESC']
    //     ],
    //     limit: 10,
    //     offset: 10
    //   }
    // );
    // --------------------------------------------------------------------------------------------
    // groupby, having
    // --------------------------------------------------------------------------------------------
    // result = await Employee.findAll(
    //   {
    //     attributes: [
    //       'gender'
    //       , [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']
    //   ],
    //     group: ['gender'],
    //     having: sequelize.literal('cnt_gender >= 40000'),
    //   }
    // );
    // --------------------------------------------------------------------------------------------
    // join
    // --------------------------------------------------------------------------------------------
    result = await Employee.findOne({
      attributes: ['empId', 'name'],
      where: {
        empId: 1
      },
      include: [
        {
          model: TitleEmp, // 내가 연결할 모델
          as: 'emp-has-tle', // 내가 사용할 관계
          required: true, // sequelize가 left outer join이 default값이라서 inner join으로 바꿔준다.
          // rquired: true이면 inner join, false면 left outer join이다.
          attributes: ['titleCode'],
          where: {
            endAt: {
              [Op.is]: null
            }
          },
          include: [
            {
              // model: Title,
              // as: 'tle-belongs-to-tl',
              association: 'tle-belongs-to-tl',
              required: true,
              attributes: ['title']
            }
          ]
        }
      ],
    });

    return response.status(200).send(
      {
        msg: '정상 처리',
        data: result // user한테는 json으로 보내야된다. 그래서 이전에 json으로 파싱해준다**
      }
    );
  } catch (error) {
    next(error);
  }
})

export default eduRouter;
