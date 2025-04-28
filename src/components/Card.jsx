"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useCart, useDispatchCart } from "../context/CartContext";

const MenuItemCard = ({
  _id,
  name,
  description,
  price,
  category,
  image,
  ingredients,
  isVeg,
  isGlutenFree,
}) => {
  const dispatch = useDispatchCart();
  const cartItems = useCart();

  // Initialize quantity and cart status
  const cartItem = cartItems.find((item) => item.id === _id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
  const [isInCart, setIsInCart] = useState(!!cartItem);

  // Sync quantity and isInCart with cartItems
  useEffect(() => {
    const existingItem = cartItems.find((item) => item.id === _id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setIsInCart(false);
    }
  }, [cartItems, _id]);

  const addToCart = () => {
    if (quantity === 0) {
      const newQuantity = 1;
      dispatch({
        type: "ADD",
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
      setQuantity(newQuantity);
      setIsInCart(true);
      console.log("Added to cart:", { id: _id, name, price, quantity: newQuantity, image });
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) {
      dispatch({
        type: "UPDATE",
        id: _id,
        quantity: newQuantity,
        price,
      });
      console.log("Updated cart:", { id: _id, name, price, quantity: newQuantity });
    } else {
      dispatch({
        type: "ADD",
        id: _id,
        name,
        price,
        quantity: newQuantity,
        image,
      });
      setIsInCart(true);
      console.log("Added to cart:", { id: _id, name, price, quantity: newQuantity, image });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        const index = cartItems.findIndex((item) => item.id === _id);
        dispatch({
          type: "REMOVE",
          index,
        });
        setIsInCart(false);
        console.log("Removed from cart:", { id: _id, name });
      } else {
        dispatch({
          type: "UPDATE",
          id: _id,
          quantity: newQuantity,
          price,
        });
        console.log("Updated cart:", { id: _id, name, price, quantity: newQuantity });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Section 1: Image */}
      <div className="relative h-36 w-full">
        <img
          src={image || "/api/placeholder/150/150"}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
          {category}
        </div>
      </div>

      {/* Section 2: Title and Price */}
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-bold text-gray-800 line-clamp-1">
            {name}
          </h3>
          <span className="text-sm font-semibold text-green-600">
            ₹{price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Section 3: Description and Ingredients */}
      <div className="px-3 pb-2 flex-grow">
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>

        {ingredients && ingredients.length > 0 && (
          <div className="mb-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Quantity Controls and Dietary Info */}
      <div className="px-3 pb-3 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            {isVeg && (
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                Veg
              </span>
            )}
            {isGlutenFree && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                GF
              </span>
            )}
          </div>

          <div className="flex items-center">
            {isInCart ? (
              <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1.5 text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={addToCart}
                className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-colors flex items-center gap-1.5"
              >
                ADD
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;