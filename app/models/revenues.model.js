module.exports = (sequelize, Sequelize) => {
  const Revenues = sequelize.define("revenues", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    revenue: {
      type: Sequelize.TEXT
    },
    expenses: {
      type: Sequelize.TEXT
    },
  });
  return Revenues;
}