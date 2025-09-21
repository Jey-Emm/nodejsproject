import 'dotenv/config';
import mysql from 'mysql2/promise.js'
import { error_handler } from '../model/error-model.js';


//assign the connection details for each mysql2 package key value pair
    const database_details = {
       host: process.env.DATABASE_HOST,
       user: process.env.DATABASE_UNAME,
       password: process.env.DATABASE_PWORD,
       database: process.env.DATABASE_NAME,
       port: process.env.DATABASE_PORT
    };

//create asynchronous function for database connection 
export async function DBConnection(){
    try {
        //initiate and create connection
        const connection = await mysql.createConnection(database_details);
        //return the connection session
        return connection;

    } catch (error) {
        error_handler(500, error.stack);
    }
}