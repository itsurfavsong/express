import { DataTypes } from "sequelize";
import dayjs from "dayjs";
// 모델명
const modelName = 'TitleEmp';

// 컬럼 정의
const attributes = {
  titleEmpId: {
    field: 'title_emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '사원 직급 ID'
  },
  empId: {
    field: 'emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '사원 ID'
  },
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '직급 코드'
  },
  startAt: {
    field: 'start_at',
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '시작 일자',
    get() {
          const val = this.getDataValue('startAt'); // init가 모델을 생성하는 객체안에 있다. 그래서 this가 init과 연관이 있기때문에 this를 적어준다. 그리고 this는 밑에 defineTitleEmp 를 뜻한다.
          if(!val) {
            return null;
          }
          return dayjs(val).format('YYYY-MM-DD');
        }
  },
  endAt: {
    field: 'end_at',
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: '종료 일자',
    get() { // 여기서 get 함수는 자바스크립스 모델 객체가 jason으로 파싱하는데 UTC 시간으로 바뀌는 걸 방지해줌.
          const val = this.getDataValue('endAt');
          if(!val) {
            return null;
          }
          return dayjs(val).format('YYYY-MM-DD');
        }
  },
  createdAt: {
    field: 'created_at',
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
    type: DataTypes.DATE,
    allowNull: false,
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
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

const options = {
  tableName: 'title_emps',
  timestamps: true,
  paranoid: true // 모든 업계가 soft delete를 한다.
};

const TitleEmp = {
  init: (sequelize) => {
    const defineTitleEmp = sequelize.define(modelName, attributes, options);

    return defineTitleEmp;
  },
    // 모델 관계를 정의 (**여기선 자식 모델에서 설정**)
  associate: (db) => {
    db.TitleEmp.belongsTo(db.Employee, { targetKey: 'empId', foreignKey: 'empId', as: 'tle-belongs-to-emp' });
    db.TitleEmp.belongsTo(db.Title, { targetKey: 'titleCode', foreignKey: 'titleCode', as: 'tle-belongs-to-tl' }); // targetKey -> 부모키
  }
};

export default TitleEmp;



