const express = require('express');
const router = express.Router();
const productServices = require('../services/products');
const helper = require('../helpers');

router.get('/', async (req, res, next) => {
    const products = await productServices.getAllServices();
    res.render('index', {
        title: 'Express',
        products: products.map((p) => ({ ...p._doc, image: p.image })),
        helper,
    });
});

module.exports = router;
