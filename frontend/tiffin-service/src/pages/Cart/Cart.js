import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartSlice,
  clearCartSlice,
  decreaseToCartSlice,
  getCartSlice,
  removeCartSlice,
} from "../../redux/slice/cartSlice";
import "./Cart.css";
import { CircularProgress, Typography } from "@mui/material";
import Payment from "../../components/Payment/Payment";

export const Cart = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const getCartData = useSelector((state) => state.cartReducer.getCartData);

  console.log(getCartData, "getCartData");

  useEffect(() => {
    dispatch(getCartSlice());
  }, [dispatch]);

  useEffect(() => {
    const getTotal=()=>{
      const calculateTotalAmount = () => {
        let total = 0;
        if (getCartData) {
          total = getCartData.reduce((acc, cartItem) => {
            return acc + cartItem?.product?.price * cartItem?.quantity;
          }, 0);
        }
        return total;
      };
    
    
      const total = calculateTotalAmount();
      setTotalAmount(total);
    }
    getTotal()
  }, [getCartData]);




  const handleAddToCart = async (item) => {
    const cartData = {
      productId: item?.product?._id,
      quantity: item?.quantity,
    };

    await dispatch(addToCartSlice(cartData));
    await dispatch(getCartSlice());
  };
  const handleDecreaseCart = async (item) => {
    const cartData = {
      productId: item?.product?._id,
      quantity: item?.quantity,
    };
    await dispatch(decreaseToCartSlice(cartData));
    await dispatch(getCartSlice());
  };
  const handleRemoveFromCart = async (item) => {
    await dispatch(removeCartSlice(item?._id));
    await dispatch(getCartSlice());
  };
  const handleClearCart = async () => {
    console.log("clear");
    await dispatch(clearCartSlice());
    await dispatch(getCartSlice());
  };



  const filteredCartData = getCartData?.filter(
    (cartItem) => cartItem?.quantity > 0
  );
  return (
    <div className="cart-container">
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Shopping Cart
      </Typography>

      {getCartData === null ? ( // Check if getCartData is still null (initial state)
        <CircularProgress />
      ) : filteredCartData?.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {filteredCartData &&
              filteredCartData?.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img
                      src={`http://localhost:5000/${cartItem?.product?.image}`}
                      alt={cartItem?.product.name}
                    />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">
                    ${cartItem?.product?.price}
                  </div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem?.quantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem?.product?.price * cartItem?.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${totalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              {filteredCartData?.length !== 0 && (
                <Payment cartItem={filteredCartData} total={totalAmount} />
              )}

              <div className="continue-shopping">
                <Link to="/products">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
