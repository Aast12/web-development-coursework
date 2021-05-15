const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const productModel = require('../models/Product');
const productServices = require('../services/products');
const { createImage } = require('../services/media');
const { upload } = require('../services/multer');

router.get('/', async (req, res, next) => {
    const products = await productServices.getAllServices();

    res.send(products);
});

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        if (req.file) {
            newProduct.image = createImage(req.file);
        }

        await newProduct.save();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/update', upload.single('image'), async (req, res) => {
    try {
        const { _id, ...values } = req.body;

        if (req.file) {
            await productModel.updateOne(
                { _id },
                {
                    ...values,
                    image: createImage(req.file),
                }
            );
        } else {
            await productModel.updateOne({ _id }, values);
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await productModel.deleteOne({ _id: req.body?.id });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
