// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import cookieParser from 'cookie-parser';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema-ti-cdp"
})

app.post('/signup', (req, res)=>{    
    let user = req.body;
    query = "INSERT INTO user (`nombre`, `apellido`, `email`, `clave`) VALUES(?,?,?,?)";
   
    connection.query(query, [user.nombre, user.apellido, user.email, user.clave], (err, results)=>{
        if (err) {
            return res.status(500).json("Error en Insertar usuario" + err);
        } else {
            return res.status(200).json("Registro exitoso" + results);
        }
    })
})


app.post('/login', (req, res)=>{ 
    const user = req.body
    const query = "SELECT * FROM user WHERE `email` = ? and `clave` = ?"    
    connection.query(query, [user.email, user.password], (err, data)=>{
        if (err) {
            return res.json("Error");
        } else {
            return res.json(data);
        }
    })
})


app.listen(8080, () =>{
    console.log("Escuchando");
})

connection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Don't connected", err);
    }
});

module.exports = connection;