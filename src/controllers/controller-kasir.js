const config = require("../configs/database");
const mysql = require("mysql");
// Tahap 1
const session = require("express-session");
const express = require("express");
const connection = mysql.createConnection(config);
connection.connect();
const app = express();

// Tahap 1 middleware
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
}));

// Menampilkan data
const getDataKasir = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM kasir ", function (error, rows){
            if (rows){
                resolve(rows);
            } else{
                reject([]);
            }
        });
    });
    if (req.session.loggedin) {
        res.send({
            success: true,
            message: "Berhasil Mengambil Data !",
            data: data
        });
    } else{
        res.send({
            succes: true,
            message: "Silahkan Login Terlebih Dahulu"
        })
    }
}
    catch(error){
        console.log(error);
        res.send({
            success: false,
            message: error.stack,
        });
    }
}
    
// Menambahkan data
const addDataKasir = async(req, res) => {
    try{
    let data = {
        nama_kasir: req.body.nama_kasir,
        jenis_kelamin: req.body.jenis_kelamin
    }    
    const result = await new Promise((resolve, reject) =>{
        connection.query("INSERT INTO kasir SET ?;",[data], function(error, rows){
            if (rows) {
                resolve(true);
            }else{
                reject(false);
            }
        });
    
    });

        res.send({
            succes: true,
            message: "Berhasil Menambahkan Data !"
        });
    
    }

    catch(error){
        console.log(error);
    res.send({
        succes: false,
        message: error.stack,
    });
}
}
// Mengubah data
const editDataKasir = async(req, res) => {
    try{
        let id = req.params.id;
    let dataEdit = {
        nama_kasir: req.body.nama_kasir,
        jenis_kelamin: req.body.jenis_kelamin
    }
    const result = await new Promise((resolve, reject) =>{
        connection.query("UPDATE kasir set ? WHERE no_kasir = ?;", [dataEdit, id], function(error, rows){
            if (rows) {
                resolve(true);
            }else{
                reject(false);
            }
        });
    });
        res.send({
            succes: true,
            message: "Berhasil Edit Data !"
        });
    }
        catch(error){
        res.send({
            succes: false,
            message: error.stack,
        });
    }
}
// Menghapus Data
const deleteDataKasir = async(req, res) => {
    try{
        let id = req.params.id;
    const result = await new Promise((resolve, reject) => {
        connection.query("DELETE FROM kasir WHERE no_kasir = ?;", [id], function(error, rows){
            if (rows) {
                resolve(true);
            }else{
                reject(false);
            }
            
        });
    });

        res.send({
            succes: true,
            message: "Berhasil Mengapus Data !"
        });
    }
    catch(error){
        res.send({
            succes: false,
            message: error.stack
        });
    }
}
module.exports = {
    getDataKasir,
    addDataKasir,
    editDataKasir,
    deleteDataKasir
}