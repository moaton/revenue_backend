module.exports = {
  HOST: '195.49.212.34',
  USER: 'postgres',
  PASSWORD: '',
  DB: 'revenuedb',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}