const {app} =require("./app")
require ("dotenv").config()
const connection = require("./db/connection")
const PORT=process.env.PORT
const cors=require("cors")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());

connection.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error(" Database connection failed:", error);
});