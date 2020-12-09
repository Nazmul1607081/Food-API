const mysql = require("mysql")

const con = mysql.createConnection({
    host: "db4free.net",
    port:3306,
    user: "nazmul81",
    password: "nazmul81",
    database:"nazmul81"
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

class Product {
    constructor(id,name,price,image) {
        this.productId = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

module.exports = Product;

