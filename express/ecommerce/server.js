const path = require("node:path");
require("dotenv").config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
});

const app = require('./src/app.js');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});