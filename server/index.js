const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "banco",
});

app.get("/", (req,res) => {
    db.query(
        "INSERT INTO usuarios (nome,email,password) VALUES ('Marcos Barbosa','teste@gmail.com','12345678')", (err,result) => {
            if(err){
                console.log(err);
            }
        }
    );
});


app.listen(3001, ()=>{
    console.log('Rodando na porta 3001');
});