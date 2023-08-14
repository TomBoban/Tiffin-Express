import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deletePaymentAction,
  getAllPayments,
} from "../../redux/slice/paymentSlice";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./UserService.css";
import { toast } from "react-toastify";
export const UserService = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getPaymentDetails = useSelector(
    (state) => state.paymentReducer.getPaymentDetails
  );

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  const [rows, setRowchange] = useState([]);

  useEffect(() => {
    if (getPaymentDetails !== null) {
      setRowchange(getPaymentDetails);
    }
  }, [getPaymentDetails]);

  const handleDelete = async (id) => {
    await dispatch(deletePaymentAction(id));
    await dispatch(getAllPayments());
  };

  const columns = [
    { id: "name", name: "Name" },
    { id: "image", name: "Image" },
    { id: "menuOption1", name: "Menu Option 1" },
    { id: "menuOption2", name: "Menu Option 2" },
    { id: "menuOption3", name: "Menu Option 3" },
    {
      id: "actions",
      name: "Actions",
      render: (row) => (
        <IconButton onClick={() => handleDelete(row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  console.log(rows, "rows");
  return (
    <div style={{ textAlign: "center" }}>
      <Typography className="my_service">My Food Services</Typography>
      {getPaymentDetails === null ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ width: "90%", marginLeft: "5%" }}>
          <TableContainer sx={{ marginBottom: "2rem" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      style={{
                        backgroundColor: "rgb(56, 157, 236)",
                        color: "white",
                      }}
                      key={column.id}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? ( // Check if rows is empty
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{fontSize:"1.5rem",padding:"2rem"}}>
                      No services subscribed.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((payment, paymentIndex) => (
                    <React.Fragment key={paymentIndex}>
                      {payment.product.map((product, productIndex) => (
                        <TableRow key={paymentIndex + "_" + productIndex}>
                          {columns.map((column) => {
                            let value = product[column.id];
                            return (
                              <TableCell key={column.id}>
                                {column.id === "image" ? (
                                  <img
                                    src={`http://localhost:5000/${value}`}
                                    alt="Product"
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                ) : column.id === "actions" ? (
                                  <>{column.render(payment)}</>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};
