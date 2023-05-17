const router = require("express").Router();
const routeUsers = require("./users");
const routePesanan = require("./pesanan");
const routeKategori = require("./kategori");
const routeKasir = require("./kasir");
const routePembeli = require("./pembeli");

// GET localhost:8080/produk => Ambil data semua produk
router.use("/users", routeUsers);
router.use("/pesanan", routePesanan);
router.use("/kategori", routeKategori);
router.use("/kasir", routeKasir);
router.use("/pembeli", routePembeli);

module.exports = router;

// Index ini untuk menampung berbagai route