import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC0rL9Eswolp56Is0CqK9UsCF1GAp-23ok", // Replace with your actual key
});

export const useGemini = () => {
  const generateContent = async (prompt: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // or "gemini-2.5-flash" if supported
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      return response.text; // Access response text correctly
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };

  return { generateContent };
};
