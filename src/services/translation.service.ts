import axios from "axios";

export class TranslationService {
  async translateText(text: string, targetLang: string): Promise<string> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    try {
      const response = await axios.get(url);
      const translation = response.data[0][0][0];
      return translation;
    } catch (error) {
      console.error("Translation error:", error);
      throw new Error("Translation failed");
    }
  }
}
