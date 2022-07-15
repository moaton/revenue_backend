module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
    // id: {
    //   type: Sequelize.BIGINT,
    //   primaryKey: true
    // },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return Accounts;
}