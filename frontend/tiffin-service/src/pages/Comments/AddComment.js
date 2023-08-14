import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/slice/commentSlice";
import { Button, TextareaAutosize } from "@mui/material";
import { getSingleProduct } from "../../redux/slice/productsSlice";
import StarRating from "./StarRating"; // Import the StarRating component

const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),

  
});

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: async (values) => {
      const data = {
        postId,
        description: values?.description,
        rating: rating, 
      };
     
      await dispatch(createCommentAction(data));
      formik.setFieldValue("description", "");
      setRating(0)

      await dispatch(getSingleProduct(postId));
    },
    validationSchema: formSchema,
  });

  const handleRate = (newRating) => {
    setRating(newRating); 
  };

  return (
    <div className="comment-container">
      <form onSubmit={formik.handleSubmit} className="comment_form p-3">
        <TextareaAutosize
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          name="description"
          id="description"
          className="textarea-field"
          placeholder="Add New comment"
        />
        <div style={{ color: "red" }}>
          {formik.touched.description && formik.errors.description}
        </div>
        <StarRating rating={rating} onRate={handleRate} /> 
        <Button className="btn_comment" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddComment;
