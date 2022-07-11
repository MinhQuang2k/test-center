
import { createPool } from "mysql2";
import { HOST, USER, PASSWORD, DB } from "../../config/mysql.config.js";

const connection = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
});

export default connection;
