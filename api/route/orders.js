const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "order get"
    })
})
router.post('/', (req, res, next) => {
    let order = {
        productId : res.body.productId,
        quantity:res.body.quantity,
    }
    res.status(200).json({
        message: "order post",
        order:order
    })
})
router.get('/:productId', (req, res, next) => {
    let productId = req.params.productId;
    res.status(200).json({
        message: "order get "+productId,
    })
})

router.delete('/:productId', (req, res, next) => {
    let productId = req.params.productId;
    res.status(200).json({
        message: "order delete "+productId,
    })
})

module.exports = router;
