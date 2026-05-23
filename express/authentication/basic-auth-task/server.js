const express = require('express');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running perfectly on http://localhost:${PORT}`);
});