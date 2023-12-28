import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    bcrypt_salt: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.DEFAULT_PASS,
};