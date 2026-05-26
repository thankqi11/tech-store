const express = require('express');
const cors = require('cors');

//tao ung dung express
const app = express();


// Cho phép Angular gọi API, neu khong co cors(), browser se chan request khac port
app.use(cors());
// Cho phép server Express đọc dữ liệu JSON gửi lên tu request body
app.use(express.json()); 

// ĐÂY CHÍNH LÀ MOCK DATA 
//nhung trong thuc te thi dung mysql, sqlserver, mongodb
let products = [
    { 
        id: 1, 
        name: 'Laptop Dell XPS', 
        price: 1500, 
        stock: 10 
    },
    { 
        id: 2, 
        name: 'iPhone 15 Pro', 
        price: 1000, 
        stock: 5 
    },
    {
        id: 3,
        name: 'Google Pixel 10 XL',
        price: 2000,
        stock: 10
    }
];

// API Endpoint: Gửi danh sách sản phẩm về cho Angular
app.get('/products', (req, res) => {
    res.json(products);
});

//-----------------------------
//get product by id
//-----------------------------

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if  (!product){
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    res.json(product);
});

//-----------------------------
//create product (POST prooduct)
//-----------------------------

app.post('/products', (req, res) => {
    const newProduct = req.body;

    products.push(newProduct);

    res.status(201).json({
        message: 'Product created successfully',
        data: newProduct
    });
});

//-----------------------------
//update product
//-----------------------------

app.put('/products', (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (!product){
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const updateProduct = req.body;

    products[index] = updateProduct;

    res.json({
        message: 'Product updated successfully',
        data: updateProduct
    });
});

//-----------------------------
//delete product
//-----------------------------

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    products = products.filter(p => p.id !== id);

    res.json({
        message: 'Product deleted successfully'
    });

});

//-----------------------------
//home route
//-----------------------------

app.get('/', (req, res) => {
    res.send('Product api is running...');
});

//-----------------------------
//start server in port 3000
//-----------------------------
const PORT = 3000;
//khoi dong server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});