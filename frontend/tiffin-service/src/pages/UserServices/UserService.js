import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePaymentAction,
  getAllPayments,
} from "../../redux/slice/paymentSlice";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
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
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const UserService = () => {
  const dispatch = useDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const downloadPDF = (transaction) => {
    const pdf = new jspdf();

    pdf.setFontSize(18);
    pdf.text("Transaction Receipt", 105, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("Product Name", 155, 40);

    pdf.text("Total Amount", 15, 40);
    pdf.text("Transaction ID", 85, 40);

    pdf.setFontSize(10);
    pdf.text(transaction.product[0].name, 155, 50);
    pdf.text(`$${transaction.totalAmount}`, 15, 50);
    pdf.text(transaction.transaction, 85, 50);

    pdf.save("transaction_receipt.pdf");
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
        <>
          <IconButton
            onClick={() => {
              setItemToDelete(row._id);
              setDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => downloadPDF(row)}>
            <DescriptionIcon />
          </IconButton>
        </>
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
                {rows.length === 0 ? ( // Check if rows is empty
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ fontSize: "1.5rem", padding: "2rem" }}
                    >
                      No services subscribed.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows?.map((payment, paymentIndex) => (
                    <React.Fragment key={paymentIndex}>
                      {payment?.product?.map((product, productIndex) => (
                        <TableRow key={paymentIndex + "_" + productIndex}>
                          {columns?.map((column) => {
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
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to stop the subscription?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  setDeleteDialogOpen(false);
                  if (itemToDelete) {
                    await dispatch(deletePaymentAction(itemToDelete));
                    await dispatch(getAllPayments());
                  }
                }}
              >
                Stop Service
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </div>
  );
};
