const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/data', (req, res) => {
    const data = [
        { name: "Harry Potter", city: "London" },
        { name: "Don Quixote", city: "Madrid" },
        { name: "Joan of Arc", city: "Paris" },
        { name: "Rosa Park", city: "Alabama" }
    ];

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
