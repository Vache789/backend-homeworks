const express = require('express');
const app = express();

const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js'); 
const cartRoutes = require('./routes/cart.routes.js');
const orderRoutes = require('./routes/order.routes.js');

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); 

module.exports = app;