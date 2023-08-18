import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

export const ListService = () => {
  const dispatch = useDispatch();

  const getPaymentDetails = useSelector(
    (state) => state.paymentReducer.getPaymentDetails
  );
  const user = useSelector((state) => state?.userReducer);
  const { userAuth } = user;

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
    { id: "firstName", name: "Name" },
    { id: "proPhoto", name: "Profile Photo" },
    { id: "address1", name: "Shipping Address" },
    { id: "city", name: "City" },
    { id: "totalAmount", name: "Total Amount" },
    { id: "totalAmount", name: "Transaction ID" },
  ];

  const filteredServices = rows?.filter((payment) =>
    payment?.product?.some((product) => product?.user?._id === userAuth._id)
  );

  console.log(filteredServices, "filteredServices");

  return (
    <div style={{ textAlign: "center" }}>
      <Typography className="my_service">Subscribed Customers</Typography>
      {getPaymentDetails === null ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ width: "90%", marginLeft: "5%" }}>
          <TableContainer sx={{ marginBottom: "2rem" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
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
                {filteredServices?.length === 0 ? ( // Check if rows is empty
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ fontSize: "1.5rem", padding: "2rem" }}
                    >
                      No Customers Yet
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredServices?.map((payment, paymentIndex) => (
                    <React.Fragment key={paymentIndex}>
                      <TableRow>
                        <TableCell>
                          {payment?.user?.firstName} {payment?.user?.lastName}
                        </TableCell>
                        <TableCell>
                          <img
                            src={payment?.user?.profilePhoto}
                            alt="User Profile"
                            style={{
                              maxWidth: "50px", // Adjust the dimensions as needed
                              maxHeight: "50px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {payment?.shippingAddress?.address1}{" "}
                          {payment?.shippingAddress?.address2}
                        </TableCell>
                        <TableCell>
                          {payment?.shippingAddress?.city}{" "}
                          {payment?.shippingAddress?.state}{" "}
                          {payment?.shippingAddress?.zip}
                        </TableCell>
                        <TableCell>${payment?.totalAmount}</TableCell>
                        <TableCell>${payment?.transaction}</TableCell>
                      </TableRow>
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
