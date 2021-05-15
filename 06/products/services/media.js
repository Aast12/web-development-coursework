const fs = require('fs');
const path = require('path');

const createImage = ({ filename, mimetype }, filepath = null) => {
    return {
        data: fs.readFileSync(
            filepath ?? path.join(__dirname, '..', 'uploads', filename)
        ),
        contentType: mimetype,
    };
};

module.exports = {
    createImage,
};
