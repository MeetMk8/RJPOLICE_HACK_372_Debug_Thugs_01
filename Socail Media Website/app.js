require('dotenv').config();
const express = require("express")
const mysql = require("mysql")
const cors= require("cors")
const path=require("path")
const json=require("json")
const corsOption={
    origin:'*',
    Credential:true,
    optionSuccessStatus:200
}

const app=express();
app.use(express.json())
app.use(cors(corsOption))
app.use(express.static("public"));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/js',express.static(__dirname+'public/js'));
app.use(express.static(path.join(__dirname,'views')));
app.set('views','./views');

app.get("/",function(req,res){
    res.sendFile('/index.html');
})

app.get("/test",function(req,res){
    res.sendFile('/test.html');
})

const con=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
})

con.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connect");
    }
})



app.get('/complaint',(req,res)=>{
    const sql="select * from Feedback_Complaint";
    con.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    
    })
})


app.get('/review',(req,res)=>{
    const sql="select * from Feedback_review";
    con.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    
    })
})

app.post('/users',(req,res)=>{
    
    const { username,name, email,district,subdistrict,contact,password } = req.body;
    console.log(username)
    // Insert data into the users table
    const sql = 'INSERT INTO users (username,name,email,district,subdistrict,contact,password) VALUES (?,?,?,?,?,?,?)';
    const values = [username,name, email,district,subdistrict,contact,password];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            // res.status(500).send('Internal Server Error');
        } else {
            console.log('Data inserted successfully');
            // res.status(201).send('Data inserted successfully');
        }
    });
})

//get login dasta


app.get('/login',(req,res)=>{
    const sql="select * from users";
    con.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    
    })
})


app.listen(8000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("port 8000")
    }
})
