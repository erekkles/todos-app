require('dotenv').config({path: './.env'});
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./utils/dbConnect');
const getUserRoutes = require('./routes/users');
const getTodosRoutes = require('./routes/todos');

dbConnect();

app.use(cors({ origin: 'https://todos-mernstack-app.vercel.app/', credentials: true, exposedHeaders: ['Authorization'] }));
app.use(express.json());
app.use('/api/users/', getUserRoutes);
app.use('/api/todos/', getTodosRoutes)

app.get("/", (req, res) => {
    res.send('<p>Server running</p>')
});

app.listen(PORT, err => {
    if(err) return console.error("ERROR", err);

    console.info(`Server listening on port ${PORT}`);
})