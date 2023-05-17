const config = require("../configs/database");
const mysql = require("mysql");
// Tahap 1
const session = require("express-session");
const express = require("express");
const connection = mysql.createConnection(config);
connection.connect();
const app = express();

// Tahap 1 middleware
// app.use(session({
//     secret: "mysecret",
//     resave: false,
//     saveUninitialized: true,
// }));

// Menampilkan data
const getDataUsers = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users", function (error, rows){
            if (rows){
                resolve(rows);
            } else{
                reject([]);
            }
        });
    });
    if (data) {
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
const addDataUsers = async(req, res) => {
    try{
        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        }
    const result = await new Promise((resolve, reject) =>{
        connection.query("INSERT INTO users SET ?;",[data], function(error, rows){
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
// const editDataUsers = async(req, res) => {
//     try{
//         let id = req.params.id;
//     let dataEdit = {
//         nama_users: req.body.nama_users,
//         harga: req.body.harga,
//         jumlah: req.body.jumlah
//     }
//     const result = await new Promise((resolve, reject) =>{
//         connection.query("UPDATE users set ? WHERE id = ?;", [dataEdit, id], function(error, rows){
//             if (rows) {
//                 resolve(true);
//             }else{
//                 reject(false);
//             }
//         });
//     });
//         res.send({
//             succes: true,
//             message: "Berhasil Edit Data !"
//         });
//     }
//         catch(error){
//         res.send({
//             succes: false,
//             message: error.stack,
//         });
//     }
// }
// Menghapus Data
// const deleteDataUsers = async(req, res) => {
//     try{
//         let id = req.params.id;
//     const result = await new Promise((resolve, reject) => {
//         connection.query("DELETE FROM users WHERE id = ?;", [id], function(error, rows){
//             if (rows) {
//                 resolve(true);
//             }else{
//                 reject(false);
//             }
            
//         });
//     });

//         res.send({
//             succes: true,
//             message: "Berhasil Mengapus Data !"
//         });
//     }
//     catch(error){
//         res.send({
//             succes: false,
//             message: error.stack
//         });
//     }
// }
module.exports = {
    getDataUsers,
    addDataUsers,
    // editDataUsers,
    // deleteDataUsers
}