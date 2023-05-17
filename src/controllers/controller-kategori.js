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
const getDataKategori = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM kategori", function (error, rows){
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
const addDataKategori = async(req, res) => {
    try{
    let data = {
        kategori: req.body.kategori
    }    
    const result = await new Promise((resolve, reject) =>{
        connection.query("INSERT INTO kategori SET ?;",[data], function(error, rows){
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
const editDataKategori = async(req, res) => {
    try{
        let id = req.params.id;
    let dataEdit = {
        kategori: req.body.kategori
    }
    const result = await new Promise((resolve, reject) =>{
        connection.query("UPDATE kategori set ? WHERE id = ?;", [dataEdit, id], function(error, rows){
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
const deleteDataKategori = async(req, res) => {
    try{
        let id = req.params.id;
    const result = await new Promise((resolve, reject) => {
        connection.query("DELETE FROM kategori WHERE id = ?;", [id], function(error, rows){
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
    getDataKategori,
    addDataKategori,
    editDataKategori,
    deleteDataKategori
}