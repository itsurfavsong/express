import { DataTypes } from "sequelize";
import dayjs from "dayjs";
// 모델명
const modelName = 'Title';

const attributes = {
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4), // auto_increment가 필요없어짐.
    primaryKey: true,
    allowNull: false,
    comment: '직급 코드'
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '직급명'
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
  tableName: 'titles',
  timestamps: true,
  paranoid: true
};

const Title = {
  init: (sequelize) => {
    const defineTitle = sequelize.define(modelName, attributes, options);

    return defineTitle;
  },
    associate: (db) => {
    // hasMany - 1:n 관계에서 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다.)
    // hasOne - 1:1 관계
    db.Title.hasMany(db.TitleEmp, {sourceKey: 'titleCode', foreignKey: 'titleCode', as: 'tl-has-tle' });
    // sourceKey는 title에서 가져온 거고 foreinKey는 titleEmp 테이블에서 가져온 것.
  }
};

export default Title;
