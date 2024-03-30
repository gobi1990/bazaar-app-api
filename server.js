import express from 'express';
import postgres from 'postgres';

const app = express();
const PORT = process.env.PORT || 3000;

const pool = postgres({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: 'require',
  });

  app.use(express.json());


app.get('/api/data', (req, res) => {
    const data = [
        { name: "Harry Potter", city: "London" },
        { name: "Don Quixote", city: "Madrid" },
        { name: "Joan of Arc", city: "Paris" },
        { name: "Rosa Park", city: "Alabama" }
    ];

    res.json(data);
});

/////// ADD PRODUCT //////////
app.post('/api/product', async (req, res) => {
    try {
        const { name, description, price, quantity, brand, shopname } = req.body;

        const tableExistsQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = 'products'
            );
        `;
        const { rows } = await pool.query(tableExistsQuery);
        const tableExists = rows[0].exists;

        if (!tableExists) {
            const createTableQuery = `
                CREATE TABLE products (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    price DECIMAL(10, 2) NOT NULL,
                    quantity INT NOT NULL,
                    brand VARCHAR(100),
                    shopname VARCHAR(100)
                );
            `;
            await pool.query(createTableQuery);
        }

        const insertQuery = `
            INSERT INTO products (name, description, price, quantity, brand, shopname)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        const values = [name, description, price, quantity, brand, shopname];
        await pool.query(insertQuery, values);

        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/////// GET ALL PRODUCTS //////////
app.get('/api/products', async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        const { rows } = await pool.query(query);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
