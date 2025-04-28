// import React, { useState } from 'react';
// import { useCart, useDispatchCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

// export const ConfirmOrder = () => {
//   const cartItems = useCart();
//   const dispatch = useDispatchCart();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation

//   const handleClick = async () => {
//     setIsSubmitting(true);

//     try {
//       // Calculate total price
//       const totalPrice = cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       );

//       // Format items for the API
//       const formattedItems = cartItems.map(item => ({
//         menuItemId: item.id, // Assuming item.id is the MongoDB _id
//         quantity: item.quantity,
//         price: item.price,
//         name: item.name,
//         image: item.image,
//       }));

//       // Prepare request body
//       const orderData = {
//         userId: 'cma0zthrn0000bu60wbvzbepu', 
//         items: formattedItems,
//         total: totalPrice,
//       };

//       const response = await fetch('http://localhost:3000/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'CLEAR' }); 
//         navigate('/myorders', { state: { order: result, message: result.message } });
//       }
//     } catch (error) {
//         console.error('Error confirming order:', error);
//         alert('Failed to confirm order. Please try again later.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <button
//         onClick={handleClick}
//         disabled={isSubmitting || !cartItems || cartItems.length === 0}
//         className={`px-6 py-2 rounded-md text-white font-medium ${
//           isSubmitting || !cartItems || cartItems.length === 0
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-blue-600 hover:bg-blue-700'
//         } transition-colors`}
//       >
//         {isSubmitting ? 'Processing...' : 'Confirm Order'}
//       </button>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const ConfirmOrder = () => {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsSubmitting(true);

    try {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const formattedItems = cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      }));

      const orderData = {
        userId: 'cma0zthrn0000bu60wbvzbepu',
        items: formattedItems,
        total: totalPrice,
      };

      const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch({ type: 'CLEAR' });
        navigate('/myorders', { state: { order: result.order, message: result.message } });
      } else {
        throw new Error(result.message || 'Failed to confirm order');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isSubmitting || !cartItems || cartItems.length === 0}
        className={`px-6 py-2 rounded-md text-white font-medium ${
          isSubmitting || !cartItems || cartItems.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
      >
        {isSubmitting ? 'Processing...' : 'Confirm Order'}
      </button>
    </div>
  );
};