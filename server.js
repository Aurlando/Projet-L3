import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyC4CbymhH1zru21ewkN_pQP94TPuAIx8z4"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Route principale de chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const instruction = "Mba valio amin'ny teny malagasy fotsiny avokoa. Aza mampiditra teny anglisy na teny hafa mihintsy. Raha misy fanontaniana amin'ny teny hafa dia adikao aloha amin'ny teny  malagasy, avy eo valio amin'ny teny malagasy amin'ny fomba mazava sy fohy.";
    const fullPrompt = `${instruction}\n\nFanontaniana: ${message}`;

    if (!message) return res.status(400).json({ error: "message requis" });

    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Serveur Gemini lancé sur http://localhost:${PORT}`));
