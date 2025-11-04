import express from "express";
import fetch from "node-fetch";
import multer from "multer";
import FormData from "form-data";

const app = express();
const upload = multer();

app.post("/upscale", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image", req.file.buffer, req.file.originalname);

    const deepaiRes = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "Api-Key": "2659d73e-fd67-4d47-826b-4e3e98226b12", // API key kamu
      },
      body: formData,
    });

    const data = await deepaiRes.json();

    res.json({
      success: true,
      output_url: data.output_url || null,
      full_response: data,
    });
  } catch (error) {
    console.error("Error during upscale:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Photo HD Proxy aktif dan siap digunakan!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
