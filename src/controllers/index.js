const users = require("./controller-users");
const pesanan = require("./controller-pesanan.js");
const kategori = require("./controller-kategori");
const kasir = require("./controller-kasir");
const pembeli = require("./controller-pembeli");

module.exports = {
    users,
    pesanan,
    kategori,
    kasir,
    pembeli
};

// Index ini merupakan wadah untuk controller