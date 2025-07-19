import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe,verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';   
const orderRouter = express.Router();

//ADMIN FEATURES

orderRouter.post('/list',adminAuth ,allOrders);
orderRouter.post('/status',adminAuth ,updateStatus);

//PAYMENT FEATURES
orderRouter.post('/place',authUser , placeOrder);
orderRouter.post('/stripe',authUser , placeOrderStripe);
orderRouter.post('/razorpay',authUser , placeOrderRazorpay);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

//VERIFY PAYMENT
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyRazorpay   ', authUser, verifyRazorpay);



//USER FEATURES
orderRouter.post('/userOrders', authUser, userOrders);

export default orderRouter;
