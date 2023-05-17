const router = require("express").Router();
const{ kasir } = require("../controllers");

// GET localhost:8080/produk => Ambil data semua produk
router.get("/" , kasir.getDataKasir);

// GET localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get("/:id" , produk.getDetailProduk);

// // POST localhost:8080/produk/add => Menambah data produk ke DATABASE
router.post("/add" , kasir.addDataKasir);

// // POST localhost:8080/produk/2 => Mengedit data produk 
router.put("/edit/:id" , kasir.editDataKasir);

// // // POST localhost:8080/produk/delete => Menghapus data produk
router.delete("/delete/:id" , kasir.deleteDataKasir);

module.exports = router;