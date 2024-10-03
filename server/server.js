const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Thisisapassword1',
    database : 'userinfo',
    port : 3306,
    connectionLimit : 30
}).promise();

app.use(cookieParser());
app.use(cors({origin:'http://localhost:3000', credentials : true}));
app.use(express.json());


app.get('/request', async (req, res) => {

const token =  req.cookies.token;
const data = jwt.verify(token, 'amongus')

if (data !== undefined){
    return res.send({message : 'success', userdata : data});}
else{
    return res.send({message : 'failed to verify token!'});
}

})


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
   await pool.query(`INSERT INTO users (name) VALUES ('${data.Name}')`)
   const id = await pool.query(`SELECT * FROM users WHERE userID = (SELECT max(userID) FROM users);`);
   await pool.query(`INSERT INTO user_data (userID, email, password) VALUES (${id[0][0].userID}, '${data.Email}', '${hash}');`)
    
   //const msg = await bcrypt.compare(data.Password, hash);
   //console.log(msg);

    return res.send({message : 'success'});

})

app.post('/getuser', async (req, res) => {

   const data = req.body;
   const password = await pool.query(`SELECT password FROM user_data WHERE email = '${data.Email}'`) 


   if (data.Password == '') {
    return res.send({message : 'nopassword'});
   } else {
   
   const confirm = await bcrypt.compare(data.Password, password[0][0].password)
   
   if (confirm) {
        const id = await pool.query(`SELECT userID FROM user_data WHERE email = '${data.Email}'`);
        const name = await pool.query(`SELECT name FROM users WHERE userID = ${id[0][0].userID}`);
        const userdata = {userID : id[0][0].userID, Name : name[0][0].name, Email : data.Email, Password : data.Password}
        const token = jwt.sign(userdata, 'amongus', {expiresIn : "1h"});
        
        console.log(token);
        
        res.cookie("token", token, {httpOnly : true})
        
        return res.send({message : 'passwordvalid', UserData : userdata })
   } else {
        return res.send({message : 'passwordnotvalid'})
   }




}

})



app.listen(5000, function(){
    console.log('server running at port 5000');   
})