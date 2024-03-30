const express = require('express');
const fs = require('fs');

const productRouter = require('./src/routes/productRoutes');

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

app.get('/api/sample', (req, res) => {
    const data = [
        { name: "Harry Potter", city: "London" },
        { name: "Don Quixote", city: "Madrid" },
        { name: "Joan of Arc", city: "Paris" },
        { name: "Rosa Park", city: "Alabama" }
    ];

    res.json(data);
});

module.exports = app;