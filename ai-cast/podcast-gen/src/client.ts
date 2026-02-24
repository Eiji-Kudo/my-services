import { GoogleGenAI } from "@google/genai";

export const client = new GoogleGenAI({
  vertexai: true,
  project: "gen-lang-client-0107414668",
  location: "us-central1",
});

export const aiStudioClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
