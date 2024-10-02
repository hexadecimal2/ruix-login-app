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

app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());

async function getData(){
    
/*
    const result = await pool.query('SELECT * FROM users;'); 
     return result[0][0]

    await the query and return the selection

*/
}

/*

routes needed -> get data to check if email and password exist
              ->  

*/

app.post('/add', async (req, res) => {

 const data = req.body;

 //handle checking on server side 
 if (data.Name === '' || data.Email === '' || data.Password === '' ){
    return res.send({message : 'please fill all fields'});
  } 
 if (!String(data.Email).includes('@gmail.com')){
    return res.send({message : 'invalid email'})
  }
 if (String(data.Password).length < 8 || ! /[A-Z]/.test(data.Password) || ! /[0-9]/.test(data.Password)){
   return res.send({message : 'password not valid'}) 
 } 
 
   console.log(data.Password);
 
   const hash = await bcrypt.hash(data.Password, 10);
    
   //insert the password into the database + put it into the token
   // await pool.query(`INSERT INTO users (name) VALUES ('${data.Name}')`)
   // const id = await pool.query(`SELECT * FROM users WHERE userID = (SELECT max(userID) FROM users);`);
   // await pool.query(`INSERT INTO user_data (userID, email, password) VALUES (${id[0][0].userID}, '${data.Email}', '${hash}');`)
    
   const msg = await bcrypt.compare(data.Password, hash);
    console.log(msg);

    return res.send({message : 'success'});

})

app.listen(5000, function(){
    console.log('server running at port 5000');   
})