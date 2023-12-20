// Import statements using ESM syntax
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Importing a default export using ESM syntax
import Transaction from './models/Transaction.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok2' });
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, datetime,price} = req.body;
    const transaction = await Transaction.create({ name, description, datetime,price});
    res.json(transaction);
});

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions=await Transaction.find({});
    res.json(transactions);

})
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
