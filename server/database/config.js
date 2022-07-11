import dotenv from 'dotenv';
dotenv.config();
export default {
  development: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDB,
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDB,
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
  },
};
