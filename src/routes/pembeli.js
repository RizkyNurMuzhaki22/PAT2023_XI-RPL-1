const router = require("express").Router();
const{ pembeli } = require("../controllers");

// GET localhost:8080/produk => Ambil data semua produk
router.get("/" , pembeli.getDataPembeli);

// GET localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get("/:id" , produk.getDetailProduk);

// // POST localhost:8080/produk/add => Menambah data produk ke DATABASE
router.post("/add" , pembeli.addDataPembeli);

// // POST localhost:8080/produk/2 => Mengedit data produk 
router.put("/edit/:id" , pembeli.editDataPembeli);

// // // POST localhost:8080/produk/delete => Menghapus data produk
router.delete("/delete/:id" , pembeli.deleteDataPembeli);

module.exports = router;