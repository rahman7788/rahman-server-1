export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required" });
    }

    const response = await fetch("https://yabes-api.pages.dev/api/ai/video/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.text(); // get raw text

    try {
      const json = JSON.parse(data);
      return res.status(200).json(json);
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: "Invalid JSON returned by API",
        raw: data,
      });
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: err.message
    });
  }
}
