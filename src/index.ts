import { qualityCheck } from "./controllers/quality.controller";
import express from "express";
import { dbConnect } from "./config/db";
import { logAction, getActions } from "./controllers/tracking.controller";
import { translateText } from "./controllers/translation.controller";
import { uploadFile, getFiles } from "./controllers/file.controller";
import { upload } from "./middlewares/file.middleware";
import { trackAction } from "./middlewares/tracking.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import "./cron/quality.cron";
import config from "./config/config";

const port = config.port || 3000;
const app = express();
app.use(express.json());
app.use(trackAction);

// Routes
app.post("/track", logAction);
app.get("/track", getActions);

app.post("/translate", translateText);

// app.post("/upload", upload.single("file"), uploadFile);

app.post(
  "/upload",
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log("index error: ", err.message);
        return next(err);
      }
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      next();
    });
  },
  uploadFile
);

app.get("/files", getFiles);

app.get("/qualityCheck", qualityCheck);

app.use(errorHandler);

dbConnect().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

import "./cron/quality.cron";
