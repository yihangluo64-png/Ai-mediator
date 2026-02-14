
import { GoogleGenAI, Type } from "@google/genai";
import { MediationAnalysis } from "../types";

export const analyzeMediation = async (partnerA: string, partnerB: string): Promise<MediationAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Analyze this conflict between two partners. 
      Partner A's perspective: "${partnerA}"
      Partner B's perspective: "${partnerB}"
      
      Provide a compassionate, neutral analysis including:
      1. A summary that acknowledges both sides.
      2. Core facts mentioned.
      3. Feelings expressed by each.
      4. 3 actionable suggestions (one compromise, one repair/connection, one understanding-based).
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          facts: { type: Type.ARRAY, items: { type: Type.STRING } },
          feelings: {
            type: Type.OBJECT,
            properties: {
              partnerA: { type: Type.ARRAY, items: { type: Type.STRING } },
              partnerB: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["partnerA", "partnerB"]
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                script: { type: Type.STRING }
              },
              required: ["id", "type", "tags", "title", "description", "script"]
            }
          }
        },
        required: ["summary", "facts", "feelings", "suggestions"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Mediation analysis failed.");
  }
};
