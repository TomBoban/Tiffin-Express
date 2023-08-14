import React from "react";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../redux/slice/commentSlice";
import { getSingleProduct } from "../../redux/slice/productsSlice";

export default function CommentsList({ comments, postId }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.userReducer);
  const { userAuth } = user;
  const loginUser = userAuth?._id;

  const handleDelComment = async (id) => {
    await dispatch(deleteCommentAction(id));
    await dispatch(getSingleProduct(postId));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: "600",

        
        }}
      >
        Customer Comments and Reviews
      </Typography>
      <ul style={{ listStyle: "none", paddingLeft: "0rem" }}>
        {/* <div className="text-gray-400">{comments?.length} Comments</div> */}
        <>
          {comments?.length <= 0 ? (
            <h4 style={{fontWeight:"600",textAlign:"center",opacity:"0.5",paddingTop:"1rem"}}>No comments</h4>
          ) : (
            comments?.map((comment) => (
              <>
                <li key={comment?._id} className="py-4 w-full">
                  <div className="comList_main">
                    <img
                      style={{ width: "2rem", height: "2rem" }}
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div
                      style={{ display: "flex", gap: "1rem", width: "100%" }}
                    >
                      <div style={{ width: "10rem" }}>
                        <h6 style={{fontSize:"0.9rem"}}>
                          {comment?.user?.firstName} {comment?.user?.lastName}
                        </h6>
                        <p style={{fontSize:"0.8rem",marginBottom:"0rem"}}>
                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                        <div className="rating-stars">
                        {Array.from({ length: comment.rating }).map((_, index) => (
                          <span key={index} className="star-icon">
                            ★
                          </span>
                        ))}
                      </div>
                      </div>
                      <p style={{width:"100%"}}>
                        {comment?.description}
                      </p>
                    
                      {/* Check if is the same user created this comment */}
                      {loginUser === comment?.user?._id ? (
                        <div className="cm_item2">
                          <IconButton
                            size="small"
                            onClick={() => handleDelComment(comment?._id)}
                            className="ml-3"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
