// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const PlaceOrder = () => {
//   const navigate = useNavigate(); // ✅ useNavigate from react-router-dom

//   const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
//     useContext(ShopContext);

//   const [method, setMethod] = useState('cod');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = [];

//       // ✅ Loop through cart items properly
//       for (const productId in cartItems) {
//         for (const size in cartItems[productId]) {
//           if (cartItems[productId][size].quantity > 0) {
//             const itemInfo = structuredClone(products.find((p) => p._id === productId));
//             if (itemInfo) {
//               itemInfo.size = size;
//               itemInfo.quantity = cartItems[productId][size].quantity; // ✅ fix quantity
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       };

//       switch (method) {
//         case 'cod': // ✅ fixed typo
//           const response = await axios.post(
//             backendUrl + '/api/order/place',
//             orderData,
//             { headers: { token } }
//           );
//           console.log(response.data);
//           if (response.data.success) {
//             setCartItems({});
//             navigate('/orders'); // ✅ navigate to correct page
//           } else {
//             toast.error(response.data.message);
//           }
//           break;

//         // You can add Stripe/Razorpay logic here later
//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // In your PlaceOrder component

//   // const onSubmitHandler = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     // Prepare order data - make sure this matches what backend expects
//   //     const orderData = {
//   //       address: formData, // This should contain firstName, lastName, email, street, city, state, zipcode, country, phone
//   //       items: cartItems, // Array of cart items
//   //       amount: getCartAmount() + delivery_fee, // Total amount including delivery fee
//   //       paymentMethod: paymentMethod // 'cod', 'stripe', or 'razorpay'
//   //     };

//   //     console.log('📦 Sending order data:', orderData);
//   //     console.log('🔑 Using token:', token);

//   //     // Make sure token is in headers
//   //     const response = await axios.post(
//   //       backendUrl + '/api/order/place',
//   //       orderData,
//   //       {
//   //         headers: {
//   //           'token': token,
//   //           'Content-Type': 'application/json'
//   //         }
//   //       }
//   //     );

//   //     console.log('✅ Order response:', response.data);

//   //     if (response.data.success) {
//   //       // Clear cart or any cleanup
//   //       // Navigate to orders page
//   //       navigate('/orders');
//   //     } else {
//   //       setError(response.data.message || 'Order placement failed');
//   //     }

//   //   } catch (error) {
//   //     console.error('❌ Error placing order:', error);
//   //     console.error('❌ Error response:', error.response?.data);

//   //     if (error.response?.status === 401) {
//   //       setError('Please login again');
//   //     } else {
//   //       setError(error.response?.data?.message || error.message || 'Order placement failed');
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="firstName"
//             value={formData.firstName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="lastName"
//             value={formData.lastName}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="email"
//           value={formData.email}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           onChange={onChangeHandler}
//           name="street"
//           value={formData.street}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="text"
//           placeholder="Street"
//         />
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="city"
//             value={formData.city}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             onChange={onChangeHandler}
//             name="state"
//             value={formData.state}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="flex gap-3">
//           <input
//             required
//             onChange={onChangeHandler}
//             name="zipcode"
//             value={formData.zipcode}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="number"
//             placeholder="Zipcode"
//           />
//           <input
//             onChange={onChangeHandler}
//             name="country"
//             value={formData.country}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           onChange={onChangeHandler}
//           name="phone"
//           value={formData.phone}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="number"
//           placeholder="Phone"
//         />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>
//         <div className="mt-12">
//           <Title text1={'PAYMENT'} text2={'METHOD'} />
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod('stripe')}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''
//                   }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
//             </div>

//             <div
//               onClick={() => setMethod('Razorpay')}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Razorpay' ? 'bg-green-400' : ''
//                   }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
//             </div>

//             <div
//               onClick={() => setMethod('cod')}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''
//                   }`}
//               ></p>
//               <p className="text-gray-400 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               type="submit"
//               className="bg-black text-white px-16 py-3 text-sm"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const PlaceOrder = () => {

//   const [method, setMethod] = useState('cod');
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setFormData(data => ({ ...data, [name]: value }))
//   }

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'Order Payment',
//       description: 'Order Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         console.log(response);

//       }
//     }
//     const rzp = new window.Razorpay(options)
//     rzp.open()

//   }

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {

//       let orderItems = [];

//       for (const productId in cartItems) {
//         const sizesObj = cartItems[productId];
//         for (const size in sizesObj) {
//           const quantity = sizesObj[size];
//           if (quantity > 0) {
//             const itemInfo = products.find((p) => p._id === productId);
//             if (itemInfo) {
//               orderItems.push({
//                 _id: itemInfo._id,
//                 name: itemInfo.name,
//                 price: itemInfo.price,
//                 size: size,
//                 quantity: quantity,
//               });
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       }

//       switch (method) {
//         case 'cod':
//           console.log("📦 Sending orderData to backend:", orderData);
//           console.log("🔑 Using token:", token);

//           try {
//             const response = await axios.post(
//               backendUrl + '/api/order/place',
//               orderData,
//               { headers: { token } }
//             );
//             if (response.data.success) {
//               setCartItems({});
//               navigate('/orders');
//             } else {
//               console.error("Backend returned error:", response.data.message);
//               toast.error(response.data.message);
//             }
//           } catch (error) {
//             console.error("Axios error:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || error.message || "Something went wrong");
//           }
//           break;

//         case 'stripe':
//           const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
//           if (responseStripe.data.success) {
//             const { session_url } = responseStripe.data;
//             window.location.replace(session_url); // Redirect to Stripe checkout
//           }
//           else {
//             toast.error(responseStripe.data.message);
//           }


//           break;

//         case 'razorpay':

//           const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', order, { headers: { token } })
//           if (responseRazorpay.data.success) {

//             initPay(responseRazorpay.data.order);

//           }



//           break;


//         default:
//           break;
//       }


//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5  sm:pt-14 min-h-[80vh] border-t'>
//       {/*--------LEFT SIDE----- */}
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='First Name'></input>
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Last Name'></input>
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='email' placeholder='Email Address'></input>
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Street'></input>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='City'></input>
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='State'></input>
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='number' placeholder='Zipcode'></input>
//           <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Country'></input>
//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='number' placeholder='Phone'></input>
//       </div>
//       {/* ----RIGHT SIDE */}
//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <CartTotal />
//         </div>
//         <div className='mt-12'>
//           {/* ---------PAYMENT SELECTION--------- */}
//           <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
//           <div className='flex gap-3 flex-col lg:flex-row'>
//             <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.stripe_logo} alt=''></img>
//             </div>

//             <div onClick={() => setMethod('Razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.razorpay_logo} alt=''></img>
//             </div>

//             <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-400 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </div>
//           </div>

//           <div className='w-full text-end mt-8'>
//             <button type='submit' className='bg-black text-white px-16 py-3 text-sm'> PLACE ORDER</button>

//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default PlaceOrder;


//ORIGINAL
// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const PlaceOrder = () => {

//   const [method, setMethod] = useState('cod');
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     setFormData(data => ({ ...data, [name]: value }))
//   }

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'Order Payment',
//       description: 'Order Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         console.log('Payment successful:', response);
//         try {
//           // Verify payment on backend
//           const { data } = await axios.post(
//             backendUrl + '/api/order/razorpay',
//             // {
//             //   razorpay_order_id: response.razorpay_order_id,
//             //   razorpay_payment_id: response.razorpay_payment_id,
//             //   razorpay_signature: response.razorpay_signature
//             // },
//             response,
//             { headers: { token } }
//           );

//           if (verifyResponse.data.success) {
//             setCartItems({});
//             navigate('/orders');
//             toast.success('Payment successful!');
//           } else {
//             toast.error('Payment verification failed');
//           }
//         } catch (error) {
//           console.error('Payment verification error:', error);
//           toast.error('Payment verification failed');
//         }
//       },
//       modal: {
//         ondismiss: function () {
//           console.log('Payment modal closed');
//         }
//       }
//     }

//     const rzp = new window.Razorpay(options);
//     rzp.on('payment.failed', function (response) {
//       console.error('Payment failed:', response.error);
//       toast.error('Payment failed: ' + response.error.description);
//     });
//     rzp.open();
//   }

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       let orderItems = [];

//       for (const productId in cartItems) {
//         const sizesObj = cartItems[productId];
//         for (const size in sizesObj) {
//           const quantity = sizesObj[size];
//           if (quantity > 0) {
//             const itemInfo = products.find((p) => p._id === productId);
//             if (itemInfo) {
//               orderItems.push({
//                 _id: itemInfo._id,
//                 name: itemInfo.name,
//                 price: itemInfo.price,
//                 size: size,
//                 quantity: quantity,
//               });
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       }

//       switch (method) {
//         case 'cod':
//           console.log("📦 Sending orderData to backend:", orderData);
//           console.log("🔑 Using token:", token);

//           try {
//             const response = await axios.post(
//               backendUrl + '/api/order/place',
//               orderData,
//               { headers: { token } }
//             );
//             if (response.data.success) {
//               setCartItems({});
//               navigate('/orders');
//             } else {
//               console.error("Backend returned error:", response.data.message);
//               toast.error(response.data.message);
//             }
//           } catch (error) {
//             console.error("Axios error:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || error.message || "Something went wrong");
//           }
//           break;

//         case 'stripe':
//           const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
//           if (responseStripe.data.success) {
//             const { session_url } = responseStripe.data;
//             window.location.replace(session_url);
//           } else {
//             toast.error(responseStripe.data.message);
//           }
//           break;

//         case 'razorpay':
//           console.log("🔄 Initiating Razorpay payment...");
//           console.log("📦 Order data:", orderData);

//           try {
//             const responseRazorpay = await axios.post(
//               backendUrl + '/api/order/razorpay',
//               orderData,
//               { headers: { token } }
//             );

//             console.log("✅ Razorpay response:", responseRazorpay.data);

//             if (responseRazorpay.data.success) {
//               initPay(responseRazorpay.data.order);
//             } else {
//               toast.error(responseRazorpay.data.message || 'Failed to create Razorpay order');
//             }
//           } catch (error) {
//             console.error("❌ Razorpay error:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || 'Razorpay payment failed');
//           }
//           break;

//         default:
//           break;
//       }

//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5  sm:pt-14 min-h-[80vh] border-t'>
//       {/*--------LEFT SIDE----- */}
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='First Name'></input>
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Last Name'></input>
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='email' placeholder='Email Address'></input>
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Street'></input>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='City'></input>
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='State'></input>
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='number' placeholder='Zipcode'></input>
//           <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='text' placeholder='Country'></input>
//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5  w-full' type='number' placeholder='Phone'></input>
//       </div>
//       {/* ----RIGHT SIDE */}
//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <CartTotal />
//         </div>
//         <div className='mt-12'>
//           {/* ---------PAYMENT SELECTION--------- */}
//           <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
//           <div className='flex gap-3 flex-col lg:flex-row'>
//             <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.stripe_logo} alt=''></img>
//             </div>

//             {/* ✅ Fixed: Use 'razorpay' (lowercase) to match the switch case */}
//             <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.razorpay_logo} alt=''></img>
//             </div>

//             <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-400 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </div>
//           </div>

//           <div className='w-full text-end mt-8'>
//             <button type='submit' className='bg-black text-white px-16 py-3 text-sm'> PLACE ORDER</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default PlaceOrder;

import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, userId } =
    useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // ✅ Razorpay popup handler
  const displayRazorpay = (razorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key id
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: razorpayOrder.id,
      handler: async (paymentResponse) => {
        console.log('✅ Payment response from Razorpay:', paymentResponse);
        try {
          // Verify payment on backend
          const verifyRes = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            {
              userId,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            },
            { headers: { token } }
          );

          if (verifyRes.data.success) {
            setCartItems({});
            toast.success('Payment verified and order placed!');
            navigate('/orders');
          } else {
            toast.error(verifyRes.data.message || 'Payment verification failed');
            navigate('/cart');
          }
        } catch (error) {
          console.error('❌ Razorpay verification error:', error);
          toast.error('Payment verification failed');
          navigate('/cart');
        }
      },
      prefill: {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          console.log('❌ Payment popup closed by user');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error('❌ Payment failed:', response.error);
      toast.error('Payment failed: ' + response.error.description);
    });
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // ✅ Build orderItems array from cart
      let orderItems = [];
      for (const productId in cartItems) {
        const sizesObj = cartItems[productId];
        for (const size in sizesObj) {
          const quantity = sizesObj[size];
          if (quantity > 0) {
            const itemInfo = products.find((p) => p._id === productId);
            if (itemInfo) {
              orderItems.push({
                _id: itemInfo._id,
                name: itemInfo.name,
                price: itemInfo.price,
                size: size,
                quantity: quantity,
              });
            }
          }
        }
      }

      let orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          console.log('📦 Sending orderData to backend:', orderData);
          try {
            const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
            if (response.data.success) {
              setCartItems({});
              navigate('/orders');
            } else {
              console.error('Backend returned error:', response.data.message);
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error('Axios error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case 'razorpay':
          console.log('🔄 Creating Razorpay order...');
          try {
            const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
              headers: { token },
            });

            if (responseRazorpay.data.success) {
              // ✅ Pass Razorpay order object to popup handler
              displayRazorpay(responseRazorpay.data.order);
            } else {
              toast.error(responseRazorpay.data.message || 'Failed to create Razorpay order');
            }
          } catch (error) {
            console.error('❌ Razorpay error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Razorpay payment failed');
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5  w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod('razorpay')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}
              ></p>
              <p className="text-gray-400 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
