import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return product && (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="border border-gray-300 rounded-lg px-3 py-3 bg-white w-full shadow-sm hover:shadow-md transition"
    >
      <div className="group cursor-pointer flex items-center justify-center mb-3">
        <img
          className="group-hover:scale-105 transition-transform duration-200 w-[100px] h-[100px] object-contain md:w-[140px] md:h-[140px]"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      <div className="text-gray-500 text-sm space-y-1">
        <p className="capitalize">{product.category}</p>
        <p className="text-gray-800 font-medium text-base md:text-lg truncate">{product.name}</p>

        <div className="flex items-center gap-1 text-xs text-yellow-500">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              className="w-3 h-3 md:w-4 md:h-4"
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt=""
            />
          ))}
          <span className="text-gray-400 ml-1">(4)</span>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-primary text-sm md:text-lg font-semibold">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-400 line-through text-xs md:text-sm">
              {currency}{product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems[product._id] ? (
              <button
                className="flex items-center gap-1 bg-primary/10 border border-primary/40 w-16 md:w-20 h-[32px] rounded-md text-sm justify-center font-medium"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary/25 w-20 h-[32px] rounded-md justify-center">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-base px-2"
                >
                  -
                </button>
                <span className="text-sm">{cartItems[product._id]}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="text-base px-2"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
