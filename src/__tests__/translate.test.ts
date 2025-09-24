import request from "supertest";
import express from "express";
import { translateText } from "../controllers/translation.controller";

const app = express();
app.use(express.json());
app.post("/translate", translateText);

describe("Translation API", () => {
  it("should translate text", async () => {
    const res = await request(app)
      .post("/translate")
      .send({ text: "Hello world", targetLang: "es" });

    expect(res.status).toBe(200);
    expect(res.body.translated).toBe("Hola Mundo");
  });
});
