module.exports = (sequelize, Sequelize) => {
  const Revenues = sequelize.define("revenues", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    revenue: {
      type: Sequelize.BIGINT
    },
    expenses: {
      type: Sequelize.TEXT
    },
  });
  return Revenues;
}