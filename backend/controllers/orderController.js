// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// //Placing order using COD Method
// // const placeOrder = async (req, res) => {
// //   try {
// //     console.log("📦 Received order request body:", req.body);
// //     console.log("📦 Request headers:", req.headers);
    
// //     const userId = req.body.userId; // injected by authUser
// //     const { items, amount, address, paymentMethod } = req.body;

// //     // Detailed validation with logging
// //     if (!userId) {
// //       console.log("❌ Missing userId");
// //       return res.status(400).json({ success: false, message: "User ID is required" });
// //     }

// //     if (!items || !Array.isArray(items) || items.length === 0) {
// //       console.log("❌ Invalid items:", items);
// //       return res.status(400).json({ success: false, message: "Items are required and must be a non-empty array" });
// //     }

// //     if (!amount || typeof amount !== 'number' || amount <= 0) {
// //       console.log("❌ Invalid amount:", amount);
// //       return res.status(400).json({ success: false, message: "Valid amount is required" });
// //     }

// //     if (!address || typeof address !== 'object') {
// //       console.log("❌ Invalid address:", address);
// //       return res.status(400).json({ success: false, message: "Valid address is required" });
// //     }

// //     // Validate address fields
// //     const requiredAddressFields = ['firstName', 'lastName', 'email', 'street', 'city', 'zipcode', 'country', 'phone'];
// //     for (const field of requiredAddressFields) {
// //       if (!address[field]) {
// //         console.log(`❌ Missing address field: ${field}`);
// //         return res.status(400).json({ success: false, message: `Address field '${field}' is required` });
// //       }
// //     }

// //     const orderData = {
// //       userId,
// //       items,
// //       address,
// //       amount,
// //       paymentMethod: paymentMethod || "cod",
// //       payment: false,
// //       date: Date.now(),
// //     };

// //     console.log("📦 Creating order with data:", orderData);

// //     const newOrder = new orderModel(orderData);
// //     await newOrder.save();

// //     // Clear user's cart after placing the order
// //     await userModel.findByIdAndUpdate(userId, { cartData: {} });

// //     console.log("✅ Order placed successfully for user:", userId);
// //     return res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });

// //   } catch (error) {
// //     console.error("❌ Error placing order:", error);
// //     return res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// //Placing order using stripe Method

// import axios from 'axios';

// const placeOrder = async () => {
//   try {
//     console.log("📥 Incoming orderData:", req.body);
//     console.log("🔑 Token received:", req.headers.token);
//     const token = localStorage.getItem('token'); // wherever you store it after login

//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
//       {
//         items: [
//           { productId: "abc123", quantity: 2 },
//           { productId: "def456", quantity: 1 }
//         ],
//         amount: 2500,
//         address: {
//           firstName: "John",
//           lastName: "Doe",
//           email: "john@example.com",
//           street: "123 Main St",
//           city: "Mumbai",
//           zipcode: "400001",
//           country: "India",
//           phone: "9876543210"
//         },
//         paymentMethod: "cod"
//       },
//       {
//         headers: {
//           token: token, // token from login
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     console.log("✅ Order response:", response.data);
//   } catch (error) {
//     console.error("❌ Order error:", error.response?.data || error.message);
//   }
// };

// const placeOrderStripe = async (req, res) => {
//     try {
//         console.log("💳 Stripe order request:", req.body);
//         // TODO: Implement Stripe payment logic
//         res.status(501).json({ success: false, message: "Stripe payment not implemented yet" });
//     } catch (error) {
//         console.error("❌ Stripe error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// //Placing order using Razorpay Method
// const placeOrderRazorpay = async (req, res) => {
//     try {
//         console.log("💳 Razorpay order request:", req.body);
//         // TODO: Implement Razorpay payment logic
//         res.status(501).json({ success: false, message: "Razorpay payment not implemented yet" });
//     } catch (error) {
//         console.error("❌ Razorpay error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// //All orders data for admin panel
// const allOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({}).populate("userId", "name email");
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error("❌ Error in allOrders:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// //user orders data for frontend
// const userOrders = async (req, res) => {
//   try {
//     const userId = req.body.userId; // injected by authUser
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized - User ID missing" });
//     }

//     const orders = await orderModel.find({ userId }).sort({ date: -1 });
//     console.log(`📦 Orders fetched for user ${userId}:`, orders.length);

//     return res.json({ success: true, orders });

//   } catch (error) {
//     console.error("❌ Error fetching user orders:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// //update order status from Admin Panel
// const updateStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
        
//         if (!orderId || !status) {
//             return res.status(400).json({ success: false, message: "Order ID and status are required" });
//         }

//         await orderModel.findByIdAndUpdate(orderId, { status });
//         res.json({ success: true, message: "Status updated successfully" });
//     } catch (error) {
//         console.error("❌ Error updating status:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Strip, { Stripe } from 'stripe';
// import razorpay from 'razorpay';

// //global variables
// const currency = 'inr';
// const deliveryCharges = 10;

// //gateway secret key
// const strip = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpayInstance = new razorpay({
//   key_id : process.env.RAZORPAY_KEY_ID,
//   key_secret : process.env.RAZORPAY_SECRET_KEY,
// }) 


// //Placing order using COD Method
// const placeOrder = async (req, res) => {
//   try {
//     const userId = req.body.userId; // injected by authUser
//     const { items, amount, address } = req.body;

//     if (!userId || !items || items.length === 0 || !amount || !address) {
//       return res.status(400).json({ success: false, message: "Invalid order data" });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "cod",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//      console.log("✅ Order saved in DB ", newOrder._id);

//     // Clear user's cart after placing the order
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     console.log("✅ Order placed for user ", userId);
//     return res.json({ success: true, message: "Order Placed Successfully" });

//   } catch (error) {
//     console.error("❌ Error placing order:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// //verify stripe
// const verifyStripe = async (req,res)=>{

//   const {userId, success, orderId} = req.body;
//   try {

//     if(success === "true"){
//       await orderModel.findByIdAndUpdate(orderId,{payment:true});
//       await userModel.findByIdAndUpdate(userId, { cardData: {} });

//       res.json({success:true, message:"Payment Successful!!!"});
//   }else{
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({success:false, message:"Payment Failed!!!"});
//   }
//  } catch (error) {
//   console.error( error);
//     return res.status(500).json({ success: false, message: error.message });
    
//   }
// }


// //Placing order using stripe Method

// const placeOrderStripe = async (req, res) => {

//   try {

//     const {userId, items, amount, address} = req.body;
//     const {origin} = req.headers;

//       const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };
    
//     const newOrder = await orderModel.create({
//       userId,
//       items,             // ✅ use items from req.body
//       address,
//       amount,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now()
//       });
//       console.log("✅ Stripe order created with ID:", newOrder._id);


//     const line_items = items.map((item)=>({
//       price_data : {
//         currency:currency,
//         product_data:{
//           name : item.name,
//         },
//         unit_amount : item.price * 100, // Stripe expects amount in cents
//       },
//       quantity: item.quantity,
//   }))

//   line_items.push({
//     price_data : {
//         currency:currency,
//         product_data:{
//           name : 'Delivery Charge',
//         },
//         unit_amount : deliveryCharges * 100, // Stripe expects amount in cents
//       },
//       quantity: 1,
//   })

//   const session = await strip.checkout.sessions.create({
//     success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//     cancel_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//     line_items,
//     mode: 'payment',  
//   })

//   res.json({success:true, session_url:session.url});
      


    
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message});
    
//   }
    
// }

// //Placing order using Razorpay Method

// const placeOrderRazorpay = async (req, res) => {

//   try {

    
//     const {userId, items, amount, address} = req.body;
 

//       const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData)
//     await newOrder.save();
        
//     // const newOrder = await orderModel.create({
//     //   userId,
//     //   items,             // ✅ use items from req.body
//     //   address,
//     //   amount,
//     //   paymentMethod: "Razorpay",
//     //   payment: false,
//     //   date: Date.now()
//     //   });
//     //   console.log("✅ Stripe order created with ID:", newOrder._id);

//     const options ={
//       amount : amount*100,
//       currency : currency.toUpperCase(),
//       receipt : newOrder._id.toString(),

//     }

//     await razorpayInstance.orders.create(options, (error,order)=>{
//       if(error){
//         console.log(error)
//         return res.json({success:false , message:error})
//       }

//       res.json({success:true, order})

//     })


    
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message});
    
//   }
    
// }

// //All orders data for admin panel
// const allOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({}) //.populate("userId", "name email");
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// //user orders data for frontend
// const userOrders = async (req, res) => {
//   try {
//     const userId = req.body.userId; // injected by authUser
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const orders = await orderModel.find({ userId });
//     console.log(`📦 Orders fetched for user ${userId} `, orders.length);

//     return res.json({ success: true, orders });

//   } catch (error) {
//     console.error("❌ Error fetching user orders ", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// const updateStatus = async (req, res) => {
//   try {

//     const { orderId, status } = req.body;
//     await orderModel.findByIdAndUpdate(orderId,{status})
//     res.json({success:true, message:"Status Updated!!!"})
    
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
    
//   }

// }

// export {verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Strip, { Stripe } from 'stripe';
import razorpay from 'razorpay';
import crypto from 'crypto';


//global variables
const currency = 'inr';
const deliveryCharges = 10;

//gateway secret key
const strip = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//Placing order using COD Method
const placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId; // injected by authUser
    const { items, amount, address } = req.body;

    if (!userId || !items || items.length === 0 || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("✅ Order saved in DB ", newOrder._id);

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    console.log("✅ Order placed for user ", userId);
    return res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
    console.error("❌ Error placing order:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//verify stripe
const verifyStripe = async (req, res) => {
  const { userId, success, orderId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cardData: {} });
      res.json({ success: true, message: "Payment Successful!!!" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed!!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//Placing order using stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);
    console.log("✅ Stripe order created with ID:", newOrder._id);

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charge',
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await strip.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    console.log("🔄 Processing Razorpay order...");
    console.log("📦 Received data:", { userId, items: items?.length, amount, address });

    // Create order in database first
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // ✅ Fixed: Use orderData instead of orderModel
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("✅ Order created in DB with ID:", newOrder._id);

    // Create Razorpay order
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    console.log("🔄 Creating Razorpay order with options:", options);

    // ✅ Fixed: Use Promise instead of callback
    try {
      const razorpayOrder = await razorpayInstance.orders.create(options);
      console.log("✅ Razorpay order created:", razorpayOrder);
      
      res.json({ 
        success: true, 
        order: razorpayOrder,
        orderId: newOrder._id 
      });
    } catch (razorpayError) {
      console.error("❌ Razorpay order creation failed:", razorpayError);
      
      // Delete the order from database if Razorpay order creation fails
      await orderModel.findByIdAndDelete(newOrder._id);
      
      res.json({ 
        success: false, 
        message: "Failed to create Razorpay order: " + razorpayError.message 
      });
    }

  } catch (error) {
    console.error("❌ Error in placeOrderRazorpay:", error);
    res.json({ success: false, message: error.message });
  }
}

// ✅ Added: Verify Razorpay payment
// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Verify signature using Razorpay's utility
//     const crypto = require('crypto');
//     const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
//     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature === razorpay_signature) {
//       // Payment is valid, update order status
//       const order = await orderModel.findOne({ 
//         'items.receipt': razorpay_order_id 
//       });

//       if (order) {
//         await orderModel.findByIdAndUpdate(order._id, { payment: true });
//         await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
        
//         res.json({ success: true, message: "Payment verified successfully" });
//       } else {
//         res.json({ success: false, message: "Order not found" });
//       }
//     } else {
//       res.json({ success: false, message: "Invalid payment signature" });
//     }

//   } catch (error) {
//     console.error("❌ Error verifying Razorpay payment:", error);
//     res.json({ success: false, message: error.message });
//   }
// }

// const verifyRazorpay = async (req,res)=>{
//   try {

//     const {userId , razorpay_order_id} = req.body

//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
  
//     if (orderInfo.status === 'paid') {
//       await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
//       await userModel.findByIdAndUpdate(userId, {cartData:{}})

//       res.json({success:true, message:"PAYMENT SUCCESSFUL!!"})
      
//     }else{
//       res.json({success:false, message:'PAYMENT FAILED'})
//     }
    
//   } catch (error) {
//     console.error(" Error in placeOrderRazorpay:", error);
//     res.json({ success: false, message: error.message });
    
//   }

// }

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // ✅ Step 1: Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.json({ success: false, message: 'Signature verification failed' });
    }

    // ✅ Step 2: Fetch order and update DB
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      // Make sure receipt = your Mongo _id
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true, message: 'PAYMENT SUCCESSFUL!!' });
    } else {
      return res.json({ success: false, message: 'PAYMENT NOT PAID YET' });
    }

  } catch (error) {
    console.error('Error in verifyRazorpay:', error);
    res.json({ success: false, message: error.message });
  }
};

//All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

//user orders data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId; // injected by authUser
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orders = await orderModel.find({ userId });
    console.log(`📦 Orders fetched for user ${userId}:`, orders.length);

    return res.json({ success: true, orders });

  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export { 
  verifyStripe, 
  placeOrder, 
  placeOrderStripe, 
  placeOrderRazorpay, 
  verifyRazorpay, // ✅ Added this export
  allOrders, 
  userOrders, 
  updateStatus 
};