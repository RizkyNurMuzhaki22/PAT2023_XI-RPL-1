const router = require("express").Router();
const{ kategori } = require("../controllers");

// GET localhost:8080/produk => Ambil data semua produk
router.get("/" , kategori.getDataKategori);

// GET localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get("/:id" , produk.getDetailProduk);

// // POST localhost:8080/produk/add => Menambah data produk ke DATABASE
router.post("/add" , kategori.addDataKategori);

// // POST localhost:8080/produk/2 => Mengedit data produk 
router.put("/edit/:id" , kategori.editDataKategori);

// // // POST localhost:8080/produk/delete => Menghapus data produk
router.delete("/delete/:id" , kategori.deleteDataKategori);

module.exports = router;