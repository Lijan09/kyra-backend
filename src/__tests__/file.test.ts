import request from "supertest";
import express from "express";
import { upload } from "../middlewares/file.middleware";
import { uploadFile } from "../controllers/file.controller";

const app = express();
app.post("/upload", upload.single("file"), uploadFile);

describe("Incorrect Upload", () => {
  it("should reject invalid file type", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", Buffer.from("test"), {
        filename: ".txt",
        contentType: "text/plain",
      });
    expect(res.status).toBe(500);
  });
});

describe("Correct Upload", () => {
  it("should accept valid file", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", Buffer.from("hello"), {
        filename: "file.pdf",
        contentType: "application/pdf",
      });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("File uploaded successfully");
  });
});
