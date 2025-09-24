import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  dbURI: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  dbURI: String(process.env.MONGODB_URI),
  SMTP_HOST: String(process.env.SMTP_HOST),
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: String(process.env.SMTP_USER),
  SMTP_PASS: String(process.env.SMTP_PASS),
};

export default config;
