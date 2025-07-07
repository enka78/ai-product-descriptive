// api/groq-proxy.js
export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API anahtarı tanımlı değil!" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Yalnızca POST kabul edilir." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || "Bilinmeyen hata" });
  }
}
