const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const productModel = require('../models/Product');
// const model

router.get('/', async (req, res, next) => {
    const products = await productModel.find({});

    res.send(products);
});

router.post('/create', async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        await newProduct.save();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/update', async (req, res) => {
    try {
        const updateProduct = await productModel.updateOne(
            { name: req.body?.name },
            req.body
        );

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await productModel.deleteOne({ name: req.body?.name });

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
