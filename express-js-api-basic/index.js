import "dotenv/config";
import express from 'express'
import { CheckCredentials} from './middleware/auth-middleware.js';
import { DBConnection } from './controller/db-controller.js';
import {GenerateToken} from './controller/token-controller.js';
import { error_handler,success_request_handler } from "./model/error-model.js";

//create express server
const app = express();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});
//use default json parser
app.use(express.json());

const temp_port = process.env.API_PORT;
//initialize port for the server to listen
app.listen(temp_port, () => {
    console.log(`Server is running in port ${temp_port}`);
    //console.log(`ENCRYPTION_KEY: ${process.env.ENCRYPTION_KEY} , ENCRYPTION_IV: ${process.env.ENCRYPTION_IV} , ALGO: ${process.env.ALGORITHM}`);
});

//authenticate route consists of "/" route, a middleware (CheckCredentials)
app.post("/authenticate", CheckCredentials, async (req,res) => {

    //initialize database connection to mysql instance
    let con = await DBConnection();

    //generate token
    const base64_token = GenerateToken();

    const c_date_time = new Date();
    const expiration = new Date();

    //set an expiration date and time for the token
    expiration.setDate(c_date_time.getDate() + 1);

    //assign values using key value pair
   const token_data = { 
    token: base64_token,
    created_date_time: c_date_time.toISOString(),
    is_expired: 0,
    requestedby: res.locals.userid.ID,
    expired_by: expiration
   }
   
   //assign values for response using key value pair
   const responseJson = {
        userid: token_data.requestedby,
        token: token_data.token,
        requested_date_time: token_data.created_date_time,
        expired_by: token_data.expired_by
        
    }

    //sql command for inserting tokens to table
   const sql_str = 'INSERT INTO TBL_TOKENS(TOKEN,CREATED_DATE_TIME,ISEXPIRED,REQUESTEDBY,EXPIREDBY) VALUES (?,?,?,?,?)';
   try {

    //execute query
    con.query(sql_str, [token_data.token, token_data.created_date_time, token_data.is_expired, token_data.requestedby, token_data.expired_by]);
    //send response with status code 200 and using the success_request_handler model
    res.status(200).send(success_request_handler(responseJson, false));
    } catch (error) {
        //send 500 status for any error encountered
        res.status(500).send(error_handler(500, error));
    } finally {
        //close connection if open
        if(con){
            con.end();
        }
    }
})

//route for getting student information
app.get("/GetStudentInfo/:id", async (req, res) => {

    //get the authorization details (bearer token)
    const auth_detail = req.get("Authorization");
    if(auth_detail && auth_detail.startsWith('Bearer ')){
        //split bearer token string and get the token string
        let req_token = auth_detail.split(' ')[1];
    
        //initialize database connection
        let con = await DBConnection();
        try {
            
            const sql_str = "SELECT TOKEN,EXPIREDBY FROM TBL_TOKENS WHERE TOKEN = ?";

            //execute query and assign the results to rows
            const [rows] = await con.query(sql_str, [req_token]);

            const dt = new Date();

            if(rows.length > 0){
                //get the first row 
                const row_result = rows[0];

                //check if the token is expired
                if(row_result.EXPIREDBY >= dt.toISOString())
                {
                    res.status(401).send(error_handler(401));
                }
                else{
                    const sql_str_std = "SELECT * FROM TBL_STUDENTINFO WHERE STUDENTID = ?"
                    const [std_rows] = await con.query(sql_str_std, [req.params.id]);
                    
                    if(std_rows.length > 0) {
                        res.status(200).send(success_request_handler(std_rows[0], false));
                    }
                    else {
                        res.status(200).send(success_request_handler("", true));
                    }
                    
                }
            }
            else{
                res.status(401).send(error_handler(401));
            }

        } catch (error) {
            res.status(500).send(error_handler(500, error));
        } finally {
            if(con){
                con.end();
            }
        }
    }
})

//Route for Getting API User Information
app.get("/GetUserInfo/:userid", async (req, res) => {

    //get the authorization details (bearer token)
    const auth_detail = req.get("Authorization");
    if(auth_detail && auth_detail.startsWith('Bearer ')){
        //split bearer token string and get the token string
        let req_token = auth_detail.split(' ')[1];
    
        //initialize database connection
        let con = await DBConnection();
        try {
            
            const sql_str = "SELECT TOKEN,EXPIREDBY FROM TBL_TOKENS WHERE TOKEN = ?";

            //execute query and assign the results to rows
            const [rows] = await con.query(sql_str, [req_token]);

            const dt = new Date();

            if(rows.length > 0){
                //get the first row 
                const row_result = rows[0];

                //check if the token is expired
                if(row_result.EXPIREDBY >= dt.toISOString())
                {
                    res.status(401).send(error_handler(401));
                }
                else{
                    const sql_str_std = "SELECT TU.USERID,TU.USERNAME,TU.CREATEDDATETIME,TU.ISACTIVE AS USERSTATUS,TR.ROLENAME,TR.ROLEDESCRIPTION,TUR.ISACTIVE AS ROLESTATUS " +
                                        "FROM TBL_USERS TU INNER JOIN TBL_USER_ROLES TUR " +
                                        "ON TU.USERID = TUR.USERID INNER JOIN TBL_ROLES TR " +
                                        "ON TR.ROLEID = TUR.ROLEID WHERE TU.USERID = ?"
                    const [std_rows] = await con.query(sql_str_std, [req.params.userid]);
                    
                    if(std_rows.length > 0) {
                        console.log(std_rows);
                        const result = {};
                        std_rows.forEach(row => {
                            const {USERID,USERNAME,CREATEDDATETIME,USERSTATUS,ROLENAME,ROLEDESCRIPTION,ROLESTATUS} = row;
                            
                            if(!result[USERID]){
                                    result[USERID] = {
                                        userid: USERID,
                                        username:USERNAME,
                                        createddatetime:CREATEDDATETIME,
                                        userisactive:USERSTATUS,
                                        roles:[]
                                    };
                            }

                            result[USERID].roles.push({
                                    rolename:ROLENAME,
                                    roledescription:ROLEDESCRIPTION,
                                    roleisactive:ROLESTATUS
                            });
                        
                        });
                        const finalResponse = Object.values(result)[0] || {};

                        res.status(200).send(success_request_handler(finalResponse, false));
                    }
                    else {
                        res.status(200).send(success_request_handler("", true));
                    }
                }
            }
            else{
                res.status(401).send(error_handler(401));
            }

        } catch (error) {
            res.status(500).send(error_handler(500, error));
        } finally {
            if(con){
                con.end();
            }
        }
    }
})

