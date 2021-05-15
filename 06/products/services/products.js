const productModel = require('../models/Product');

const getAllServices = () => {
    return new Promise((resolve, reject) => {
        productModel.find({}).exec(function (err, obj) {
            if (err) reject(err);
            resolve(
                obj.map((product) => ({
                    ...product,
                    image: product?.image?.data
                        ? {
                              contentType: product.image.contentType,
                              data: product.image.data.toString('base64'),
                          }
                        : null,
                }))
            );
        });
    });
};

module.exports = {
    getAllServices,
};
