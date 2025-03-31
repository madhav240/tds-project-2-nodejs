const express = require("express");
const prettier = require("prettier");
const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

app.post("/api/prettier", async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }

    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Missing "code" in request body' });
    }

    // Format code using Prettier
    const formattedCode = await prettier.format(code, { parser: "babel" });

    return res.json({ formattedCode });
  } catch (error) {
    return res.status(500).json({ error: `Prettier Error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
