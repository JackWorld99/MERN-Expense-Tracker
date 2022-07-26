const express =require('express');
const cors =require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;
const app = express();
const con =require('./db/connectDB');

app.use(cors());
app.use(express.json());
app.use(require('./routes/route'));

con.then(db=>{
    if(!db) return process.exit(1);

    app.listen(port, ()=>{
        console.log(`Server listening at port http://localhost:${port}`);
    });

    app.on('error', err => console.log(`Failed To Connect with HTTP Server: ${err}`))
}).catch(error=>{console.log(`Connection Error: ${error}`)})
