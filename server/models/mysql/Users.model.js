import { Sequelize } from "sequelize"
import db from "./dbSeque.js";

const { DataTypes } = Sequelize

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    accessToken: {
        type: DataTypes.TEXT
    },
    admin: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Users
