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
const getDataPesanan = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `pesanan` JOIN kategori ON kategori.id = pesanan.id_kategori JOIN kasir ON kasir.no_kasir = pesanan.no_kasir JOIN pembeli ON pembeli.kode_pembeli = pesanan.kode_pembeli", function (error, rows){
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
const addDataPesanan = async(req, res) => {
    try{
    let total = req.body.harga * req.body.jumlah;
    let potongan;
    if (total > 100000) {
        potongan = 20000;
    }else{
        potongan = 0;
    }
    let total_pembayaran = total - potongan;

    let data = {
        nama_pesanan: req.body.nama_pesanan,
        id_kategori: req.body.id_kategori,
        harga: req.body.harga,
        jumlah: req.body.jumlah,
        potongan: potongan,
        total_pembayaran: total_pembayaran,
        no_kasir: req.body.no_kasir,
        kode_pembeli: req.body.kode_pembeli
        
    }    
    const result = await new Promise((resolve, reject) =>{
        connection.query("INSERT INTO pesanan SET ?;",[data], function(error, rows){
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
const editDataPesanan = async(req, res) => {
    try{
        let total = req.body.harga * req.body.jumlah;
    let potongan;
    if (total > 100000) {
        potongan = 20000;
    }else{
        potongan = 0;
    }
    let total_pembayaran = total - potongan;

        let id = req.params.id;
    let dataEdit = {
        nama_pesanan: req.body.nama_pesanan,
        id_kategori: req.body.id_kategori,
        harga: req.body.harga,
        jumlah: req.body.jumlah,
        potongan: potongan,
        total_pembayaran: total_pembayaran,
        no_kasir: req.body.no_kasir,
        kode_pembeli: req.body.kode_pembeli
    }
    const result = await new Promise((resolve, reject) =>{
        connection.query("UPDATE pesanan set ? WHERE kode_pesanan = ?;", [dataEdit, id], function(error, rows){
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
const deleteDataPesanan = async(req, res) => {
    try{
        let id = req.params.id;
    const result = await new Promise((resolve, reject) => {
        connection.query("DELETE FROM pesanan WHERE kode_pesanan = ?;", [id], function(error, rows){
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
    getDataPesanan,
    addDataPesanan,
    editDataPesanan,
    deleteDataPesanan
}