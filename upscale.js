import fetch from "node-fetch";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = new FormData();
    const { image } = req.body || {};

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    formData.append("image", image);

    const deepaiRes = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "Api-Key": "2659d73e-fd67-4d47-826b-4e3e98226b12",
      },
      body: formData,
    });

    const data = await deepaiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
        }
