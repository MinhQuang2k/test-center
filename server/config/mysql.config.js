import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
// console.log(path.resolve(__dirname, '../.env'));
export const HOST = process.env.MYSQLHOST;
export const USER = process.env.MYSQLUSER;
export const PASSWORD = process.env.MYSQLPASSWORD;
export const DB = process.env.MYSQLDB;
