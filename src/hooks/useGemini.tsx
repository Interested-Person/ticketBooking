import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const useGemini = () => {
  const generateContent = async (prompt: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };

  return { generateContent };
}