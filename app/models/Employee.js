import { DataTypes } from "sequelize";
import dayjs from 'dayjs';

// 1. 모델명 (JS 내부에서 사용하는 이름)
const modelName = 'employee';

// 2. 컬럼 정의 (carmelCase)
const attributes = {
  empId: { // 카멜기법으로 써줘서 field 명이랑 달라서 꼭 field명을 써줘야함
    field: 'emp_id', // DB의 physical name
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼 데이터 타입 지정
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // auto_increment 지정
    comment: '사원 ID' // 코멘트 설정
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '사원명'
  },
  birth: {
    field: 'birth',
    type: DataTypes.DATE, // DATE는 squelize가 약한 부분이라서 get 혹은 set를 추가해준다. (ORM은 이런 설정해주는게 많다)
    allowNull: false,
    comment: '사원 생년월일',
    get() {
      const val = this.getDataValue('birth');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  gender: {
    field: 'gender',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '성별'
  },
  hireAt: {
    field: 'hire_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '입사일',
    get() {
      const val = this.getDataValue('hireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  fireAt: {
    field: 'fire_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '퇴사일',
    get() {
      const val = this.getDataValue('fireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  supId: {
    field: 'sup_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: '사수 번호'
  },
  createdAt: {
    field: 'created_at',
    // type: DataTypes.NOW, 혹은
    type: DataTypes.DATE,
    allowNull: false,
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    // type: DataTypes.NOW, 혹은
    type: DataTypes.DATE,
    allowNull: false,
    comment: '수정일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    // type: DataTypes.NOW, 혹은
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

// 이를 통해서 프로그래밍단에서 DB를 생성할 수 있다 (ORM의 특징)

// 3. Options 설정 (테이블 관련 설정)
const options = {
  tableName: 'employees', // 실제 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리 (2개 All)
  // createdAt: 'empCreatedAt', 혹여나 이름이 다르면 이런식으로 설정을 해주면 된다.
  // updatedAt: false 이는 updatedAt만 따로 설정해주고 싶을 때
  paranoid: true // Soft Delete 설정 (deletedAt 자동 관리) - ORM의 destroy(원래는 hard delete)를 성질을 update로 바뀌어버림.
}

// 모델 객체 작성
const Employee = {
  init: (sequelize) => {
    const defineEmployee = sequelize.define(modelName, attributes, options);

    return defineEmployee;
  }
};

export default Employee;
