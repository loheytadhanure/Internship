//ONLY FOR COD AND STRIPE, FOR RAZORPAY I AM MAKING A NEW FILE

import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl, userId } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const paymentMethod = searchParams.get('paymentMethod') || 'cod';

    const verifyPayment = async () => {
        if (!token) return;

        try {
            let response;

            switch (paymentMethod) {
                case 'stripe':
                    response = await axios.post(
                        backendUrl + '/api/order/verifyStripe',
                        { success, orderId, userId },
                        { headers: { token } }
                    );
                    break;

                case 'cod':
                default:
                    // COD requires no verification
                    setCartItems({});
                    navigate('/orders');
                    return;
            }

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                toast.error(response.data.message || 'Payment verification failed');
                navigate('/cart');
            }
        } catch (err) {
            console.error('Verification error:', err);
            toast.error(err.message || 'Error verifying payment');
        }
    };

    useEffect(() => {
        verifyPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return <div>Verifying your payment...</div>;
};

export default Verify;



// import React, { useEffect } from 'react';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Verify = () => {

//     const { navigate, token, setCartItems, backendUrl, userId } = useContext(ShopContext);
//     const [searchParams, setSearchParams] = useSearchParams();

//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');
//     const paymentMethod = searchParams.get('paymentMethod') || 'cod'; // Default to COD
//     const razorpay_order_id = searchParams.get('razorpay_order_id');

//     console.log("orderId from URL:", orderId);
//     console.log("Payment Method:", paymentMethod);

//     const verifyPayment = async () => {
//         try {
//             if (!token) {
//                 return null;
//             }

//             let response;

//             switch (paymentMethod) {
//                 case 'razorpay':
//                     response = await axios.post(backendUrl + '/api/order/verifyRazorpay', {
//                         userId,
//                         razorpay_order_id
//                     }, { headers: { token } });
//                     break;

//                 case 'stripe':
//                     response = await axios.post(backendUrl + '/api/order/verifyStripe', {
//                         success,
//                         orderId,
//                         userId
//                     }, { headers: { token } });
//                     break;

//                 case 'cod':
//                 default:
//                     // For COD, just navigate to orders directly
//                     setCartItems({});
//                     navigate('/orders');
//                     return;
//             }

//             if (response.data.success) {
//                 setCartItems({});
//                 navigate('/orders');
//             } else {
//                 navigate('/cart');
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     }

//     useEffect(() => {
//         verifyPayment();
//     }, [token])

//     return (
//         <div>
//             verifying
//         </div>
//     );
// }

// export default Verify;


//ORIGINAL

// import React, { useEffect } from 'react';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Verify = () => {

//     const { navigate, token, setCartItems, backendUrl, userId } = useContext(ShopContext);
//     const [searchParams, setSearchParams] = useSearchParams();

//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');
//     console.log("orderId from URL:", orderId);


//     const verifyPayment = async () => {

//         try {

//             if (!token) {
//                 return null;
//             }

//             const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId, userId }, { headers: { token } })

//             if (response.data.success) {
//                 setCartItems({});
//                 navigate('/orders');
//             } else {
//                 navigate('/cart')
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message);

//         }



//     }

//     useEffect(() => {
//         verifyPayment();

//     }, [token])


//     return (
//         <div>
//             verifingg
//         </div>
//     );
// }

// export default Verify;


// import React, { useEffect } from 'react';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Verify = () => {

//     const { navigate, token, setCartItems, backendUrl, userId } = useContext(ShopContext);
//     const [searchParams, setSearchParams] = useSearchParams();

//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');
//     const razorpay_order_id = searchParams.get('razorpay_order_id');

//     console.log("razorpay_order_id from URL:", razorpay_order_id);
//     const paymentMethod = searchParams.get('paymentMethod'); // Add this to identify payment method

//     console.log("orderId from URL:", orderId);
//     console.log("Payment Method:", paymentMethod);
//     console.log("Success status:", success);

//     const verifyPayment = async () => {
//         try {
//             if (!token) {
//                 console.log("No token available");
//                 return null;
//             }

//             let response;

//             // Check which payment method was used
//             if (paymentMethod === 'razorpay' || !paymentMethod) {
//                 // Default to Razorpay verification
//                 console.log("Verifying Razorpay payment...");
//                 response = await axios.post(backendUrl + '/api/order/verifyRazorpay', {
//                     // success,
//                     // orderId,
//                     // userId
//                     userId,
//                     razorpay_order_id: razorpay_order_id || orderId
//                 }, { headers: { token } });
//             } else if (paymentMethod === 'stripe') {
//                 // Stripe verification
//                 console.log("Verifying Stripe payment...");
//                 response = await axios.post(backendUrl + '/api/order/verifyStripe', {
//                     success,
//                     orderId,
//                     userId
//                 }, { headers: { token } });
//             }

//             console.log("Verification response:", response.data);

//             if (response.data.success) {
//                 setCartItems({});
//                 toast.success("Payment verified successfully!");
//                 navigate('/orders');
//             } else {
//                 toast.error(response.data.message || "Payment verification failed");
//                 navigate('/cart');
//             }

//         } catch (error) {
//             console.error("Verification error:", error);
//             toast.error(error.response?.data?.message || "Payment verification failed");
//             navigate('/cart');
//         }
//     }

//     useEffect(() => {
//         if (token) {
//             verifyPayment();
//         }
//     }, [token])

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="text-center">
//                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
//                 <p className="mt-4 text-lg">Verifying your payment...</p>
//             </div>
//         </div>
//     );
// }

// export default Verify;