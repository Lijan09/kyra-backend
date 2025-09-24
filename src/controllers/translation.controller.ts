import { Request, Response } from "express";
import { TranslationService } from "../services/translation.service";

const translationService = new TranslationService();

export const translateText = async (req: Request, res: Response) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Text and targetLang are required" });
  }

  try {
    const translated = await translationService.translateText(text, targetLang);
    return res.status(200).json({ translated });
  } catch (err) {
    return res.status(500).json({ error: "Translation failed" });
  }
};
