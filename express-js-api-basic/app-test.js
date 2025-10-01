import { DBConnection } from "./controller/db-controller.js";
import express from 'express'
import { GenerateToken } from "./controller/token-controller.js";
import {encrypt,decrypt} from "./transformation/crypt.js"
const app = express();

app.use(DBConnection);

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})
