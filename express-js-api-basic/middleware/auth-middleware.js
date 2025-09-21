import { error_handler } from '../model/error-model.js';
import 'dotenv/config.js';
import { DBConnection } from '../controller/db-controller.js';
import { encrypt } from '../transformation/crypt.js';

export async function CheckCredentials (req, res, next) {

    const {username,password} = req.body;
    if(username === '' || password === ''){
        console.log('Missing Username or Password is missing');
    }
    const encryptedValue = encrypt(password);
    let connection = '';

    connection = await DBConnection('authmiddleware');
    
    const sql_str = 'SELECT DISTINCT T_U.USERID as ID FROM TBL_USERS T_U INNER JOIN TBL_USER_ROLES T_U_R ' + 
                    'ON T_U.USERID = T_U_R.USERID WHERE T_U.USERNAME = ? AND T_U.USERPASSWORD = ? AND T_U_R.ISACTIVE = ?'
    
    try {
        const [rows] = await connection.query(sql_str, [username,encryptedValue, 1]);
        if(rows.length > 0){
            //res.locals = res.locals || {};
            res.locals.userid = rows[0];
            next();
        }
        else {
            res.status(404).send(error_handler(404));
        }
    } catch (error) {
        res.status(500).send(error_handler(500, error));
        
    }finally {
        if(connection){
            connection.end();
        }
    }
    
    /*await connection.query(sql_str, [username,encryptedValue, 1], (err, rows) => {
        console.log(sql_str);
        if(err){
            res.status(500).send(error_handler(500));
        }
        else{
            if(rows.length === 0){
            res.status(404).send(error_handler(404));
            }
            else{
            req.locals = req.locals || {};
            req.locals = rows;
            console.log(req.locals);
            next();
            }
            
        }
    });
    await connection.end();*/
}