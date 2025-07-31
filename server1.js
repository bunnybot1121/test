const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve main.html only for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Serve all static files from project root (including index.html, assets/, games/, etc.)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});