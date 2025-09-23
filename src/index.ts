import express from "express";
import multer from "multer";
import { dbConnect } from "./config/db";
import { logAction, getActions } from "./controllers/tracking.controller";
// import { translateText } from "./controllers/translationController";
import { uploadFile, getFiles } from "./controllers/file.controller";
import { upload } from "./middlewares/file.middleware";
import { trackAction } from "./middlewares/tracking.middleware";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(trackAction);

// Routes
app.post("/track", logAction);
app.get("/track", getActions);

// app.post("/translate", translateText);

app.post("/upload", upload.single("file"), uploadFile);
app.get("/files", getFiles);

app.use(errorHandler);

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
