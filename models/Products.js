/* 
    create table Products
*/

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  // 함수를 추가하는 것을 프로토타입이라고 함, dataFormat이라는 함수를 만듦
  Products.prototype.dateFormat = (date) => {
    return moment(date).format('YYYY년 MM월 DD일');
  };

  return Products;
};
