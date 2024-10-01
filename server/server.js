const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();


const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Thisisapassword1',
    database : 'userinfo',
    port : 3306,
    connectionLimit : 30
}).promise();

app.use(cors({origin:'localhost:3000'}));
app.use(express.json());

async function getData(){
    
/*
    const result = await pool.query('SELECT * FROM users;'); 
     return result[0][0]

    await the query and return the selection

*/
}

app.get('/a', async (req, res) => {

 const a = await getData();
 res.send(a);
 
})

app.listen(5000, function(){
    console.log('server running at port 5000');   
})