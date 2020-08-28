require("dotenv").config();

export const __prod__ = process.env.NODE_ENV === "production";

export const DB_NAME = process.env.ORM_DB_NAME;
export const DB_PASSWORD = process.env.ORM_DB_PASSWORD;
export const DB_USER = process.env.ORM_DB_USER;
