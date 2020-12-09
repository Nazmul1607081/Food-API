const express = require('express')
const router = express.Router()
const mysql = require("mysql")
const multer = require('multer')
var uniqid = require('uniqid');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/products');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
}); 

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const con = mysql.createConnection({
    host: "db4free.net",
    port:3306,
    user: "nazmul81",
    password: "nazmul81",
    database:"nazmul81"
})



const Product = require('../models/product')

router.get('/', (req, res, next) => {
    let sql = 'SELECT * FROM product';
    con.query(sql,(err,result,fields)=>{
        if(err)return res.status(404).json({
            message:err
        });
        console.log("Successful");
        res.status(200).json(result);
    })
})
router.post('/',upload.single("productImage"), (req, res, next) => {
    console.log(req.file)

    const product = new Product(
        uniqid(),
        req.body.name,
        req.body.price,
        req.file.path
    )
    let sql = 'INSERT INTO product(productId,name,price,image) VALUES (?,?,?,?)';
    con.query(sql,[product.productId,product.name,product.price,product.image],(err,result,fields)=>{
        if(err)return res.status(404).json({
            message:err
        });
        console.log("Insert successful");
        res.status(200).json(result)
    })
})
router.get('/:productId', (req, res, next) => {

    let productId = req.params.productId;
    let sql = 'SELECT * FROM product WHERE productId=?';
    con.query(sql,[productId],(err,result,fields)=>{
        if(err)return res.status(404).json({
            message:err
        });
        let update_sql = 'UPDATE product SET price=?'
        con.query(update_sql,[100],(err2,result2,fields2)=>{
                if(err2)return res.status(404).json({
                message:err
                });
                res.status(200).json(result2)
        })
    })
})
router.patch('/:productId', (req, res, next) => {
    let productId = req.params.productId;
    let sql = 'DELETE FROM product WHERE productId=?';
    con.query(sql,[productId],(err,result,fields)=>{
        if(err)return res.status(404).json({
            message:err
        });
        console.log("Successful");
        res.status(200).json(result);
    })
})

router.delete('/:productId', (req, res, next) => {
    let productId = req.params.productId;
    let sql = 'SELECT * FROM product WHERE productId=?';
    con.query(sql,[productId],(err,result,fields)=>{
        if(err)return res.status(404).json({
            message:err
        });
        console.log("Successful");
        res.status(200).json(result);
    })
})

module.exports = router;
