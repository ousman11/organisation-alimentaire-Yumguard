import axios from "axios";

export const translate = async (text: string): Promise<string> => {
  try {
    const res = await axios.post(
      "https://libretranslate.com/translate",
      {
        q: text,
        source: "en",
        target: "fr",
        format: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res.data as { translatedText: string };
    return data.translatedText;
  } catch (error) {
    console.error("Erreur de traduction:", error);
    return text; // fallback en anglais
  }
};
