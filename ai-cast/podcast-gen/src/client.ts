import { GoogleGenAI } from "@google/genai";

export const client = new GoogleGenAI({
  vertexai: true,
  project: "gen-lang-client-0107414668",
  location: "us-central1",
});
