import crypto from 'crypto'
import 'dotenv/config.js';
import { error_handler } from '../model/error-model.js';

const token_length = process.env.TOKEN_LENGTH;

export function GenerateToken(){

    try {
        const bytes = Math.ceil(token_length/2);
        const token = crypto.randomBytes(bytes).toString('base64');

        return token;
    } catch (error) {
        return error_handler(500, error);
    }
}
