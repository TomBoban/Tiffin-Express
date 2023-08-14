import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { clearCartSlice, getCartSlice } from "../../redux/slice/cartSlice";

const Payment = (props) => {
  const userAuth = useSelector((state) => state.userReducer.userAuth);
  const dispatch = useDispatch();
  const handleToken = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    const context = { token, cart: props.cartItem, total: props.total };
    const res = await axios.post(`http://localhost:5000/api/payment`, context, config);
    
    if (res.data.status === 200) {
      toast.success("Payment done successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "success1",
      });
      await dispatch(clearCartSlice());
      await dispatch(getCartSlice());
    } else {
      toast.error("Payment Failed, Please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "success1",
      });
    }
  };

  console.log(props,"props");

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51NapXvJXDHCrMxsTGW3x4g1lwpM8lzB63zuG2tUkSCdIeyy1P85WDsVJjn68MzCJUajEX39n7jK84hEWpkV6OWqW009ODSAIdK"
        token={handleToken}
        shippingAddress
        billingAddress
        amount={props.total * 100}
        name="Complete Transaction"
      />
    </div>
  );
};

export default Payment;
