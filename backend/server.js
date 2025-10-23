const express = require("express")
const app = express();
require('dotenv').config();


//middleware
app.use(express.json())
app.use(express.static('uploads'))

const PORT = process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Listening on server https://localhost:${PORT}`);
})