import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Paper,CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../redux/slice/productsSlice";
import { Link, useParams, useHistory } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {FaUtensils} from "react-icons/fa6";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const [prodList, setProdList] = useState([]);
  const singleProduct = useSelector(
    (state) => state.productReducer.singleProduct
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct && singleProduct !== null) {
      setProdList(singleProduct);
    }
  }, [singleProduct, prodList]);

  console.log(prodList, "prodList");

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
            <img src={`http://localhost:5000/${prodList?.image}`} alt="" className="product-detail-image" />
            
          </div>
          <div className="small-images-container">
            {/* {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{prodList?.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Description: </h4>
          <p>{prodList?.description}</p>
          <p className="price">Price: ${prodList?.price}</p>
          <h4>Menu: </h4>
          <p className="menuOpt"><span className="menu-icon"><FaUtensils /></span><b>Menu 1: </b>{prodList?.menuOption1}</p>
          <p className="menuOpt"><span className="menu-icon"><FaUtensils /></span><b>Menu 2: </b>{prodList?.menuOption2}</p>
          <p className="menuOpt"><span className="menu-icon"><FaUtensils /></span><b>Menu 3: </b>{prodList?.menuOption3}</p>
          {/* <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div> */}
          <div className="buttons">
            <button type="button" className="add-to-cart" >Subscribe</button>
          </div>
        </div>
      </div>

      {/* <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div> */}
    </div>
          </>
        )}
      </Grid>
    </Grid>
  );
};
