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

export const MINIO_CONFIG = {
    MINIO_ENDPOINT: 'localhost',
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY,
    MINIO_SECRETKEY: process.env.MINIO_SECRETKEY,
    MINIO_BUCKET: process.env.MINIO_BUCKET,
    MINIO_PORT_CONSOLE: process.env.MINIO_PORT_CONSOLE,
}

export enum PublicationStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}
