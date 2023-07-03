import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slice/productsSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import "./Products.css";

export const Products = () => {
  const dispatch = useDispatch();
  const [prodList, setProdList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getProducts = useSelector((state) => state.productReducer.getProducts);
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;
  const totalItems = prodList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (getProducts && getProducts !== null) {
      setProdList(getProducts);
    }
    console.log(prodList, "prodList");
  }, [getProducts, prodList]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredProducts = prodList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderRatingStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(<AiFillStar key={i} />);
    }

    if (hasHalfStar) {
      starElements.push(<AiOutlineStar key={filledStars} />);
    }

    return starElements;
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
      <Grid item xs={12} sm={3}>
        {/* Filter component */}
        FIlter
      </Grid>
      <Grid item xs={12} sm={9} sx={{ padding: "1.5rem" }}>
        {getProducts === null ? (
          <CircularProgress />
        ) : (
          <>
            <Grid sx={{ paddingBottom: "1rem", width: "300px" }}>
              <TextField
                label="Search Products"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsSearch />
                    </InputAdornment>
                  ),
                  style: {
                    textAlign: "center",
                  },
                }}
                sx={{
                  marginTop: "1rem",
                  "& .MuiInputBase-root": {
                    height: "50px", // Adjust the height as per your preference
                  },
                }}
              />
            </Grid>
            <Grid container spacing={2}>
              {paginatedProducts.map((item) => (
                <Grid key={item._id} item xs={12} sm={6} lg={4}>
                  <Card className="product-card" sx={{ cursor: "pointer" }}>
                    <CardMedia
                      image={item?.image}
                      component="img"
                      height="200"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {item?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item?.shortDescription}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        Price: {`$${item.price}`}
                      </Typography>
                      <div className="rating-stars">
                        {renderRatingStars(item.rating)}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "2rem 0rem" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};
