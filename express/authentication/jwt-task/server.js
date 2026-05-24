require('dotenv').config({ quiet : true });
const express = require('express');
const routes = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(express.static('public'));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`JWT Task Server is running on http://localhost:${PORT}`);
});