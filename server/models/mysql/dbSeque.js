import { Sequelize } from "sequelize";
import { HOST, USER, PASSWORD, DB } from "../../config/mysql.config.js";

const db = new Sequelize(
    DB,
    USER,
    PASSWORD, {
    host: HOST,
    dialect: 'mysql'
})

export default db;