const express = require('express');
const app = express();
const PORT = 3000;

const routes = require('./routes/routes.js');

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`API Key Task Server is running on http://localhost:${PORT}`);
});