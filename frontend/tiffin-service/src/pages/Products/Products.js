import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
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
import { Link, useHistory } from "react-router-dom";

import "./Products.css";

export const Products = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [prodList, setProdList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getProducts = useSelector((state) => state.productReducer.getProducts);
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (getProducts && getProducts !== null) {
      setProdList(getProducts);
    }
  }, [getProducts, prodList]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredProducts = prodList
    .filter((item) => {
      // Check if the item's category name is included in the selectedCategories array
      if (selectedCategories.length === 0) {
        // No categories selected, return all products
        return true;
      } else {
        return selectedCategories.includes(item?.category[0]?.name);
      }
    })
    .filter((item) => {
      // Apply the search filter
      if (searchTerm === "") {
        // No search term entered, return all products
        return true;
      } else {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const productName = item?.name.toLowerCase();
        return productName.includes(lowerCaseSearchTerm);
      }
    });

  const renderRatingStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.floor(rating);
    const remainingStars = maxStars - filledStars;

    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(<AiFillStar key={i} />);
    }

    for (let i = 0; i < remainingStars; i++) {
      starElements.push(<AiOutlineStar key={filledStars + i} />);
    }

    return starElements;
  };

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        categoryName,
      ]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== categoryName)
      );
    }
  };

  const categories = [
    ...new Set(prodList.map((item) => item?.category[0]?.name)),
  ];

  const onCardClick = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: "rgb(230, 235, 241)",
        minHeight: "100vh",
        marginTop: "0",
      }}
    >
      <Grid item xs={12} sm={2} className="filterBody">
        <Card className="paper_filter">
          <Typography className="filter_txt">Filter</Typography>
        </Card>
        <Card className="content_filter">
          <FormControl component="fieldset">
            <Typography className="filter_txt">Categories</Typography>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                    name={category}
                  />
                }
                label={category}
              />
            ))}
          </FormControl>
        </Card>
      </Grid>
      <Grid item xs={12} sm={10} sx={{ paddingRight: "1rem" }}>
        {getProducts === null ? (
          <CircularProgress />
        ) : (
          <>
            <Card className="text_filter">
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
                  "& .MuiInputBase-root": {
                    height: "50px", // Adjust the height as per your preference
                    width: "300px",
                  },
                }}
              />
            </Card>

            <Grid container spacing={2} sx={{ marginTop: "0.4rem" }}>
              {paginatedProducts.map((item) => (
                <Grid key={item._id} item xs={12} sm={6} lg={4}>
                  <Card
                    className="product-card"
                    sx={{ cursor: "pointer" }}
                    onClick={() => onCardClick(item._id)}
                  >
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
