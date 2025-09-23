import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  dbURI: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  dbURI: String(process.env.MONGODB_URI),
};

export default config;