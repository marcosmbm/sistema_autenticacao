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
        (err,response) => {
            if(err){
                res.send(err);
            }
            if(response.length == 0){
                bcrypt.hash(password, saltRounds,(err,hash) =>{
                    db.query(
                        "INSERT INTO usuarios (nome,email,password) VALUES(?,?,?)",[name,email,hash],(err,result) => {
                            if(err){
                                res.send(err);
                            }
    
                            res.send({
                                nome: name,
                                email: email,
                                msgSucess: 'Cadastrado com sucesso !!'
                            });
                        }
                    );
                });
            }
            else{
                res.send({msgError: 'Usuário já cadastrado !!'});
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
                                    msgSucess: `Seja bem vindo de volta ${response[0].nome}`
                                });
                    }
                    else{
                        res.send({msgError: "Senha incorreta !!"});
                    }
                });  
            }
            else{
                res.send({msgError: 'Conta não encontrada !!'});
            }
        }
    )
});

module.exports = router;