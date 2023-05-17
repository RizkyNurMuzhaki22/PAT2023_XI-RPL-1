const router = require("express").Router();
const{ pesanan } = require("../controllers");

// GET localhost:8080/produk => Ambil data semua produk
router.get("/" , pesanan.getDataPesanan);

// GET localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get("/:id" , produk.getDetailProduk);

// // POST localhost:8080/produk/add => Menambah data produk ke DATABASE
router.post("/add" , pesanan.addDataPesanan);

// // POST localhost:8080/produk/2 => Mengedit data produk 
router.put("/edit/:id" , pesanan.editDataPesanan);

// // // POST localhost:8080/produk/delete => Menghapus data produk
router.delete("/delete/:id" , pesanan.deleteDataPesanan);

module.exports = router;