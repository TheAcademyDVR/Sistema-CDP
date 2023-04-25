const express = require("express");
const cors = require('cors');
const cookieParser =  require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../connection");
const router = express.Router();

// const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');

require("dotenv").config();

// var auth = require('../services/authentication');
// var checkRole = require('../services/checkRole');

router.post('/signup', (req, res)=>{    
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


router.post('/login', (req, res)=>{ 
    const user = req.body
    const query = "SELECT * FROM user WHERE `email` = ? AND `clave` = ?"    
    connection.query(query, [user.email, user.clave], (err, results)=>{
        if (err) {
            return res.json({Status: "Error"});
        } 
        if(results.length > 0 ) {
            return res.json({Status: "Existoso"});
        } else{
            return res.json({Status: "Error", Error: "Email o clave incorrectos"})
        }
    })
})


module.exports = router;