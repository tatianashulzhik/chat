import { config } from 'dotenv';
config();

export const JWT = {
    secret: process.env.JWT_SECRET,
};

export const CONNECTION = {
    type: process.env.DATABASE_CONNECTION,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};
