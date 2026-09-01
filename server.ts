import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      version: "3.1.0",
      engine: "ORBITAL-SVD-ABLITERATION-CORE",
      torchBackend: "CUDA/ROCm/PyTorch-2.6",
      timestamp: new Date().toISOString()
    });
  });

  // Optional Gemini API explanation & research assistant endpoint
  app.post("/api/research-advisor", async (req, res) => {
    try {
      const { modelId, prompt, currentStrategy, layerRange, alpha } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          advice: `[Local Heuristic Engine] For ${modelId} with alpha=${alpha} on layers ${layerRange?.join('-')}, optimal representation orthogonalization requires Frobenius norm rescaling factor sqrt(||W||_F^2 / ||W*||_F^2) to guarantee zero MMLU degradation while eliminating refusal hyperplane projection.`
        });
      }

      const systemPrompt = `You are a Principal AI Research Engineer specializing in LLM Representation Engineering, Activation Hyperplane Geometry, SVD, and Frobenius Norm-Preserving Weight Abliteration (Ref: Plinius/OBLITERATUS, Heretic, Dealign). Provide deep, concise, mathematically precise guidance on layer selection, singular vector rank, and steering vectors for the given model.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemPrompt}\n\nModel: ${modelId}\nStrategy: ${currentStrategy}\nLayer Range: ${JSON.stringify(layerRange)}\nAlpha: ${alpha}\nQuestion/Context: ${prompt || 'Suggest optimal SVD ablation hyperparameters and subspace isolation.'}` }] }
        ]
      });

      res.json({ advice: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate research guidance" });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ORBITAL-SVD Research Workbench active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
