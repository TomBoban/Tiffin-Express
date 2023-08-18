import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../redux/slice/productsSlice";
import { Link, useParams } from "react-router-dom";

import { FaUtensils } from "react-icons/fa6";
import { addToCartSlice } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import axios from "axios";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const [prodList, setProdList] = useState([]);
  const [showViewCart, setShowViewCart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+14317261706");
  const [notificationMessage, setNotificationMessage] = useState("");

  const singleProduct = useSelector(
    (state) => state.productReducer.singleProduct
  );
  const user = useSelector((state) => state?.userReducer);
  const { userAuth } = user;

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct && singleProduct !== null) {
      setProdList(singleProduct);
    }
  }, [singleProduct, prodList]);

  console.log(singleProduct, "singleProduct");

  const handleCartClick = () => {
    const cartData = {
      productId: prodList?._id,
      quantity: 1,
    };
    dispatch(addToCartSlice(cartData));

    toast.success("Service added successfully", {
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
    setShowViewCart(true);
  };

  const handleEmailClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "http://localhost:5000/api/sms/send-notification",
        {
          phoneNumber: phoneNumber,
          message: notificationMessage,
        },
        config
      );
     
      toast.success("Message sent successfully", {
      
      });
      setOpenModal(false); 
    } catch (error) {
      // Handle error
      console.error("Error sending message: ", error);
      toast.error("Failed to send message", {
       
      });
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {singleProduct === null ? (
          <CircularProgress />
        ) : (
          <>
            <div>
              <div className="product-detail-container">
                <div>
                  <div className="image-container">
                    <img
                      src={`http://localhost:5000/${prodList?.image}`}
                      alt=""
                      className="product-detail-image"
                    />
                  </div>
                  <div className="small-images-container">
                    <div className="flex justify-center  items-center">
                      <CommentsList postId={id} comments={prodList?.comments} />
                    </div>
                    {userAuth && <AddComment postId={id} />}
                  </div>
                </div>

                <div className="product-detail-desc">
                  <h1>{prodList?.name}</h1>
                  <div className="service_owner">
                    <h4>Service Owner: </h4>
                    <div className="srv_name">
                      {prodList?.user?.firstName} {prodList?.user?.lastName}
                    </div>
                  </div>
                  <h4>Description: </h4>
                  <p>{prodList?.description}</p>
                  <p className="price">
                    Price: <label> ${prodList?.price}</label>
                  </p>
                  <h4 className="srv_menu">Menu: </h4>
                  <p className="menuOpt">
                    <span className="menu-icon">
                      <FaUtensils />
                    </span>
                    <b>Menu 1: </b>
                    {prodList?.menuOption1}
                  </p>
                  <p className="menuOpt">
                    <span className="menu-icon">
                      <FaUtensils />
                    </span>
                    <b>Menu 2: </b>
                    {prodList?.menuOption2}
                  </p>
                  <p className="menuOpt">
                    <span className="menu-icon">
                      <FaUtensils />
                    </span>
                    <b>Menu 3: </b>
                    {prodList?.menuOption3}
                  </p>

                  <div className="buttons_tog">
                    <button
                      onClick={handleCartClick}
                      type="button"
                      className="add-to-cart"
                    >
                      Subscribe
                    </button>
                    {showViewCart && (
                      <Link className="viewBtn" to="/cart">
                        <button type="button" className="add-to-cart">
                          View Cart
                        </button>
                      </Link>
                    )}
                  </div>
                  <div style={{ paddingTop: "2rem" }}>
                    <Button
                      onClick={() => setOpenModal(true)}
                      variant="outlined"
                      className="call_bck"
                    >
                      Want us to Call You back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Grid>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle
          style={{ fontSize: "1.5rem", textAlign: "center", fontWeight: "700" }}
        >
          Request a Call Back
        </DialogTitle>
        <DialogContent>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div
              className="input-group"
              style={{ display: "flex", gap: "3.5rem" }}
            >
              <b>Our Contact:</b>
              <input
                type="tel"
                value={phoneNumber}
                readOnly
              />
            </div>
            <div
              className="input-group"
              style={{ display: "flex", gap: "1rem" }}
            >
              <b>Customer Contact:</b>
              <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </div>
            <Button
              onClick={handleEmailClick}
              variant="outlined"
              className="send-message-button"
            >
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
