import { DBConnection } from "./controller/db-controller.js";
import express from 'express'
import { GenerateToken } from "./controller/token-controller.js";
import {encrypt,decrypt} from "./transformation/crypt.js"
const app = express();

app.use(DBConnection);

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
})


//DBConnection();

//const tk = GenerateToken();
//console.log(tk);

/*const pword = 'T#stthEon1'
const encrypt_val = encrypt(pword);
console.log(encrypt_val);
const decrypt_val = decrypt(encrypt_val);
console.log(decrypt_val);*/