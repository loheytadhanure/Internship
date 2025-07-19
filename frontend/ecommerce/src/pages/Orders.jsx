import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, products, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/order/userOrders',
        {},
        { headers: { token } }
      );

      console.log('Orders response:', response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            item.orderId = order._id; // Add order ID for tracking
            allOrdersItem.push(item);
          });
        });
        console.log("Flattened order items:", allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error("Error loading order data:", error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please login again.');
      } else {
        setError(error.response?.data?.message || error.message || 'Failed to load orders');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className='text-center py-8'>
          <div className='text-lg'>Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border-t pt-16'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <div className='text-red-500 mt-4 text-center'>{error}</div>
        <button
          onClick={loadOrderData}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Retry
        </button>
      </div>
    );
  }

  if (!orderData.length) {
    return (
      <div className='border-t pt-16'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <div className='text-center mt-8'>
          <div className='text-gray-600'>No orders found</div>
          <p className='text-sm text-gray-500 mt-2'>Your orders will appear here once you make a purchase.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString || 'N/A';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-green-500';
      case 'delivered': return 'bg-green-600';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='mt-8'>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              {item?.image?.[0] && (
                <img
                  className='w-16 sm:w-20 object-cover rounded'
                  src={item.image[0]}
                  alt={item?.name || 'Product image'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png'; // Make sure you have a placeholder image
                  }}
                />
              )}
              <div>
                <p className='sm:text-base font-medium'>{item?.name || 'Unnamed product'}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-600'>
                  <p className='text-lg font-semibold'>{currency}{item?.price || 'N/A'}</p>
                  <p>Qty: {item?.quantity || 1}</p>
                  <p>Size: {item?.size || 'N/A'}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-500'>{formatDate(item?.date)}</span></p>
                {item?.paymentMethod && (
                  <p className='mt-1'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
                )}
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className={`min-w-2 h-2 rounded-full bg-green-400 ${getStatusColor(item?.status)}`}></div>
                <p className='text-sm font-medium capitalize'>{item?.status || 'Processing'}</p>
              </div>
              <button
                className='border border-gray-300 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors'
                // onClick={() => {
                //   // Add track order functionality
                //   console.log('Track order:', item.orderId);
                // }}
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

// import React, { useEffect, useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {
//   const { backendUrl, token, products, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadOrderData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (!token) {
//         setError('No authentication token found');
//         return;
//       }

//       const response = await axios.post(
//         backendUrl + '/api/order/userOrders',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             item.status = order.status;
//             item.payment = order.payment;
//             item.paymentMethod = order.paymentMethod;
//             item.date = order.date;
//             allOrdersItem.push(item);
//           });
//         });
//         console.log("Flattened order items:", allOrdersItem);
//         setOrderData(allOrdersItem.reverse());
//       }


//       // console.log("User orders response:", response.data);
//       // if (response.data.success) {
//       //   let allOrdersItem = []
//       //   response.data.orders.map((order) => {
//       //     order.items.map((item) => {
//       //       item['status'] = order.status;
//       //       item['payment'] = order.payment;
//       //       item['paymentMethod'] = order.paymentMethod;
//       //       item['date'] = order.date;
//       //       allOrdersItem.push(item);

//       //     })
//       //   })
//       //   console.log(allOrdersItem);
//       // }

//       // if (response.data?.success) {
//       //   setOrderData(Array.isArray(response.data.orders) ? response.data.orders : []);
//       // } else {
//       //   setError(response.data?.message || 'Failed to fetch orders');
//       // }
//     } catch (error) {
//       console.error("Error loading order data:", error);
//       setError(error.message || 'Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   if (loading) {
//     return <div className='border-t pt-16'>Loading orders...</div>;
//   }

//   if (error) {
//     return (
//       <div className='border-t pt-16'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//         <div className='text-red-500 mt-4'>{error}</div>
//       </div>
//     );
//   }

//   if (!orderData.length) {
//     return (
//       <div className='border-t pt-16'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//         <div className='mt-4'>No orders found</div>
//       </div>
//     );
//   }

//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {orderData.map((item, index) => (
//           <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//             <div className='flex items-start gap-6 text-sm'>
//               {item?.image?.[0] && (
//                 <img
//                   className='w-16 sm:w-20'
//                   src={item.image[0]}
//                   alt={item?.name || 'Product image'}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'path/to/placeholder-image.png';
//                   }}
//                 />
//               )}
//               <div>
//                 <p className='sm:text-base font-medium'>{item?.name || 'Unnamed product'}</p>
//                 <div className='flex items-center gap-3 mt-2 text-base bg-gray-50'>
//                   <p className='text-lg'>{currency}{item?.price || 'N/A'}</p>
//                   <p>Quantity: {item?.quantity || 1}</p>
//                   <p>Size: {item?.size || 'M'}</p>
//                 </div>
//                 <p>Date: <span className='text-gray-400'>{item?.date || 'N/A'}</span></p>
//               </div>
//             </div>
//             <div className='md:w-1/2 flex justify-between'>
//               <div className='flex items-center gap-2'>
//                 <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                 <p className='text-base'>Ready to ship</p>
//               </div>
//               <button className='border px-4 py-2 text-smm font-medium rounded-sm'>
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

// import React, { useEffect, useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {

//   const { backendUrl, token, products, currency } = useContext(ShopContext);

//   const [orderData, setOrderData] = useState([])

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null;
//       }

//       // const response = await axios.post(backendUrl + '/api/order/userorders ', {}, { headers: { token } })
//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

//       // console.log(response.data);
//       console.log("User orders response:", response.data);

//       if (response.data.success) {
//         setOrderData(response.data.orders || []);
//       } else {
//         console.warn("Orders fetch did not succeed:", response.data.message);

//       }

//     } catch (error) {
//       console.log(error);
//       console.error("Error loading order data:", error);

//     }

//   }

//   useEffect(() => {
//     loadOrderData();
//   }, [token])



//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {
//           orderData.map((item, index) => (
//             <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//               <div className='flex items-start gap-6 text-sm'>
//                 <img className='w-16 sm:w-20' src={item.image[0]} alt=''></img>
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-2 text-base bg-gray-50'>
//                     <p className='text-lg'>{currency}{item.price}</p>
//                     <p>Quantity: 1</p>
//                     <p>Size: M</p>
//                   </div>
//                   <p>Data: <span className='text-gray-400'>25, Jul ,  2025</span></p>
//                 </div>
//               </div>
//               <div className='md:w-1/2 flex justify-between'>
//                 <div className='flex items-center gap-2'>
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className=' text-base'>Ready to ship</p>
//                 </div>
//                 <button className='border px-4 py-2 text-smm font-medium rounded-sm'>Track Order</button>
//               </div>

//             </div>

//           ))
//         }
//       </div>

//     </div>
//   );
// }

// export default Orders;
