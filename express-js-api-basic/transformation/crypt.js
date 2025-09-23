import crypto from 'crypto'
import 'dotenv/config.js';
import { error_handler } from '../model/error-model.js';



export const encrypt = (str) => {

    try {
        const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
        const ENCRYPTION_IV = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const ALGORITHM = process.env.ALGORITHM;

        const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV);
        let encrypted = cipher.update(str, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        return error_handler(500, error);
    }
};

export const decrypt = (encryptedstr) => {

    try {
        const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
        const ENCRYPTION_IV = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const ALGORITHM = process.env.ALGORITHM;
        
        const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV);
        let decrypted = decipher.update(encryptedstr, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
       return error_handler(500, error);
    }
  
};