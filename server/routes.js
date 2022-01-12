const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "banco",
});

router.post('/register', (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    db.query(
        "SELECT * FROM usuarios WHERE email = ?",[email],
        (err,result) => {
            if(err){
                res.send(err);
            }
            if(result.length == 0){
                bcrypt.hash(password, saltRounds,(err,hash) =>{
                    db.query(
                        "INSERT INTO usuarios (nome,email,password) VALUES(?,?,?)",[name,email,hash],(err,result) => {
                            if(err){
                                res.send(err);
                            }
    
                            res.send({msg: 'Cadastrado com sucesso !!'});
                        }
                    );
                });
            }
            else{
                res.send({msg: 'Usuário já cadastrado !!'});
            }
        });
});

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        (err,response) => {
            if(err){
                req.send(err);
            }
            if(response.length > 0){
                bcrypt.compare(password, response[0].password,(err,result) => {
                    if(result){
                        res.send({
                                    nome: response[0].nome,
                                    email: response[0].email,
                                    msg: "Usuário logado !!",
                                });
                    }
                    else{
                        res.send({msg: "Senha incorreta !!"});
                    }
                });  
            }
            else{
                res.send({msg: 'Conta não encontrada !!'});
            }
        }
    )
});

module.exports = router;