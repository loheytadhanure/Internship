// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import { connect } from 'mongoose'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// // App Config 
// const app = express()


// // Connect to databases
// connectDB()
// connectCloudinary()

// //middleware
// app.use(express.json())
// app.use(cors())

// // Request logging middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`, req.body);
//     next();
// });

//api end points
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)

// app.get('/', (req,res)=>{
//     res.send("API working!!!");
// })

// Error handling middleware
// app.use((error, req, res, next) => {
//     console.error('❌ Server Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
// });

// 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({ success: false, message: 'Route not found' });
// });

// app.listen(port , ()=> console.log('Server started on PORT :'+port))

// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import { connect } from 'mongoose'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// import mongoose from 'mongoose';

// App Config 
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// //middleware
// app.use(express.json())
// app.use(cors())

// //api end points
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)

// app.get('/', (req,res)=>{
//     res.send("API working!!!");

// })




// app.listen(port , ()=> console.log('Server started on PORT :'+port))

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';    
// import connectCloudinary from './config/cloudinary.js';

// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';

// // ✅ App Config
// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Connect to databases
// connectDB();
// connectCloudinary();

// // ✅ Middleware
// app.use(express.json());
// app.use(cors());

// // ✅ API Endpoints
// app.use('/api/user', userRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);

// // ✅ Health check route
// app.get('/', (req, res) => {
//   res.send('API working!!!');
// });

// // ✅ 404 handler (optional)
// app.use('*', (req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // ✅ Start server
// app.listen(port, () => console.log('Server started on PORT :' + port));

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
//import { placeOrder } from '../controllers/orderController.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// ✅ App Config
const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to databases
connectDB();
connectCloudinary();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ API Endpoints
// app.use('/api/user', userRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);




// ✅ Health check route
app.get('/', (req, res) => {
  res.send('API working!!!!!');
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ✅ Start server
app.listen(port, () => console.log('✅ Server started on PORT' + port));

