import React, { useEffect } from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { Plus, Minus, Trash2 } from "lucide-react";

const Checkout = () => {
  const cartItems = useCart();
  const dispatch = useDispatchCart();

  // Log cart items for debugging
  useEffect(() => {
    console.log("Checkout cartItems:", cartItems);
  }, [cartItems]);

  // Handle quantity increment
  const incrementQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch({
      type: "UPDATE",
      id: item.id,
      quantity: newQuantity,
      price: item.price,
    });
    console.log("Updated cart in Checkout:", { id: item.id, name: item.name, quantity: newQuantity });
  };

  // Handle quantity decrement
  const decrementQuantity = (item, index) => {
    if (item.quantity > 0) {
      const newQuantity = item.quantity - 1;
      if (newQuantity === 0) {
        dispatch({
          type: "REMOVE",
          index,
        });
        console.log("Removed from cart in Checkout:", { id: item.id, name: item.name });
      } else {
        dispatch({
          type: "UPDATE",
          id: item.id,
          quantity: newQuantity,
          price: item.price,
        });
        console.log("Updated cart in Checkout:", { id: item.id, name: item.name, quantity: newQuantity });
      }
    }
  };

  // Handle item removal
  const removeItem = (index) => {
    dispatch({
      type: "REMOVE",
      index,
    });
    console.log("Removed from cart in Checkout:", { index });
  };

  // Calculate total price (price * quantity for each item)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-4 text-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mt-2">
          Add some items to your cart and come back!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
                      <button
                        onClick={() => decrementQuantity(item, index)}
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item)}
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-600"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right max-w-4xl mx-auto mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Total: ₹{totalPrice.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Checkout;