const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// middleWare 
app.use(express.json());
app.use(cors());

// routes 
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');
const categoriesRoute = require('./routes/categories.route');
const storeRoute = require('./routes/store.route');
const supplierRoute = require('./routes/supplier.route');
const stockRoute = require('./routes/stock.route');
const userRoute = require('./routes/user.route');


app.get('/', (req, res) => {
    res.send('Route is working YaY!')
});


// posting to database 
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/store', storeRoute);
app.use('/api/v1/supplier', supplierRoute);
app.use('/api/v1/stock', stockRoute);
app.use('/api/v1/user', userRoute);


module.exports = app;