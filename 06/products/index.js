const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const mongoose = require('mongoose');

const PORT = 5000;

const mongoDb = 'mongodb://127.0.0.1:27017/shop';

const main = async () => {
    await mongoose.connect(mongoDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/products', productsRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    app.listen(PORT, () => {
        console.log('Server running');
    });
};

main();
