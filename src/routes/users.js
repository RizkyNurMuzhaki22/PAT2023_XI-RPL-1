const router = require("express").Router();
const{ users } = require("../controllers");

// GET localhost:8080/produk => Ambil data semua produk
router.get("/" , users.getDataUsers);

// GET localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get("/:id" , produk.getDetailProduk);

// // POST localhost:8080/produk/add => Menambah data produk ke DATABASE
router.post("/add" , users.addDataUsers);

// // POST localhost:8080/produk/2 => Mengedit data produk 
// router.put("/edit/:id" , barang.editDataBarang);

// // // POST localhost:8080/produk/delete => Menghapus data produk
// router.delete("/delete/:id" , barang.deleteDataBarang);

module.exports = router;