const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files from the 'public' folder within the project directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // Serve the index.html file from the 'public' folder within the project directory
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
