const app = require('./app.js');
const env = require('./configs/env.js');
const pool = require('./configs/db.js');

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});