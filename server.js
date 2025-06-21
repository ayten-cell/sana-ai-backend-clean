require('dotenv').config();
console.log("API Anahtarı Test:", process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].message });
 } catch (error) {
  console.error("Hata:", error);
  res.status(500).json({ error: "API hatası oluştu." });
}
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
