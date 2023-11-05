import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import GrassIcon from "@mui/icons-material/Grass";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ThumbDown } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SILConfirmModal from "../../CustomComp/SILConfirmModal";
import { useEffect } from "react";
import useBooking from "../../../CustomHooks/useBooking";
import { useSelector } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function PayCancel({ type, bookingOrderObj, closeModal }) {
  console.log("bookingOrderObj:", bookingOrderObj);
  const { admin } = useSelector((state) => state.venue);
  console.log("admin info:", admin);
  const bookingId = bookingOrderObj.bookingId;
  const orderId = bookingOrderObj.orderId;
  const [paidAmount, setPaidAmount] = useState(
    type === "pay" ? bookingOrderObj.balAmount : 0
  );
  const [paidAmountErr, setPaidAmountErr] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const inputDate = new Date(bookingOrderObj.bookedOn);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidvia, setPaidVia] = useState("0");
  const [paidviaErrMsg, setPaidViaErrMsg] = useState("");
  const [transActionNumber, setTransActionNumber]  = useState("");
  const [transActionNumberErrMsg, setTransActionNumberErrMsg] = useState('');

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[inputDate.getUTCMonth()];
  const day = inputDate.getUTCDate();
  const year = inputDate.getUTCFullYear();
  const { payBalAmount, cancelOrder } = useBooking();

  const formattedDate = `${month}-${day}`;

  useEffect(() => {
    console.log("hey loaded here");
  }, [modalOpen]);

  const CancelOrder = async () => {
    if (parseInt(paidAmount) >= 0) {
      let obj = {
        bookingId: bookingId,
        orderId: orderId,
        paidAmount: paidAmount,
        arena_id: admin.info.arena_id,
      };

      const resp = await cancelOrder(obj);

      if (resp.length > 0) {
        if (resp.hasOwnProperty("validationErrors")) {
        } else {
          setPaymentSuccess(true);
        }
      } else {
        setPaidAmountErr("Please enter refund amount");
      }
    }
  };

  const payBalance = () => {
    if (parseInt(paidAmount) > bookingOrderObj.balAmount) {
      if (bookingOrderObj.balAmount > parseInt(paidAmount)) {
        setModalOpen(true);
      } else {
        payBalanceAmount(true);
      }
    } else {
      // setPaidAmountErr("Please check the balance amount to pay");
      setModalOpen(true);
      // payBalanceAmount(true);
    }
  };

  const balanceAmount = (value, type) => {
    // Remove non-numeric characters
    var newValue = value.replace(/[^0-9]/g, "");

    if (type === "pay") {
      if (newValue.trim() === "") {
        setPaidAmount("");
      } else {
        const numericValue = parseInt(newValue);

        if (
          parseInt(numericValue) > bookingOrderObj.advpaid &&
          parseInt(numericValue) <= bookingOrderObj.balAmount
        ) {
          setPaidAmount(numericValue.toString());
          setPaidAmountErr(""); // Reset the error message
          setDisabledSubmit(false);
        } else {
          setPaidAmountErr(
            `Please enter a value between ${bookingOrderObj.advpaid} and ${
              bookingOrderObj.balAmount + 1
            }`
          );
          setDisabledSubmit(true);
          setPaidAmount(numericValue.toString());
        }
      }
    }
  };

  const payBalanceAmount = async (confirm) => {
    if (confirm) {
      //pay the balance give a api call

      //check whether user has selected payvia or not
      if(paidvia === "0") {
        setPaidViaErrMsg("Please Select Paid Via");
        return false;
      }

      //check whether user has entered the phone nukber or not
      if(transActionNumber.length !== 10) { 
        setTransActionNumberErrMsg("Please Enter Valid Phone Number");
        return false;
      }


      let obj = {
        bookingId: bookingId,
        orderId: orderId,
        paidAmount: paidAmount,
        arena_id: admin.info.arena_id,
        balance_amount_paid_via:paidvia
      };

      const resp = await payBalAmount(obj);

      if (resp.length > 0) {
        if (resp.hasOwnProperty("validationErrors")) {
        } else {
          setPaymentSuccess(true);
        }
      } else {
      }
    }
  };

  const pay_via = (payviaval) => {
    setPaidVia(() => payviaval) 
    if(payviaval === "0") {
      setPaidViaErrMsg("Please Select Paid Via");

    } else {
      setPaidViaErrMsg("");
    }
  }

  const handlePaidNumber = (value) => {
    var mobile_num = value.replace(/[^0-9]/g, "");
    setTransActionNumberErrMsg("");
    if(mobile_num.length>10) {

    } else {
      setTransActionNumber(mobile_num);      
    }
    
  }
  
  

  return (
    <>
      <div className="flex ">
        <div className="flex-column left-column   flex-column-right-border">
          <h6 className="font-strong">Booking Info</h6>
          <div className="pos-rel">
            <PersonIcon style={{ color: "magenta" }} className="icon-person" />{" "}
            <div className="icon-text">{bookingOrderObj.captain_name}</div>
            <PhoneAndroidIcon
              style={{ color: "blue" }}
              className="icon-person icon-person-col2"
            />{" "}
            <div className="icon-text icon-text-col2">
              {bookingOrderObj.captain_contact}
            </div>
          </div>
          <div className="pos-rel mt10 mt1rem">
            <GrassIcon
              style={{ color: "yellowgreen" }}
              className="icon-person"
            />{" "}
            <div className="icon-text">{bookingOrderObj.turf_name}</div>
            <CalendarMonthIcon
              style={{ color: "green" }}
              className="icon-person icon-person-col2"
            />{" "}
            <div className="icon-text icon-text-col2">{formattedDate}</div>
          </div>
          <div className="pos-rel mt10 mt1rem">
            <WatchLaterIcon
              style={{ color: "orange" }}
              className="icon-person icon-person-col2"
            />{" "}
            <div className="icon-text icon-text-col2">
              {bookingOrderObj.bookedAt}
            </div>
            <MoreTimeIcon style={{ color: "purple" }} className="icon-person" />{" "}
            <div className="icon-text">
              {bookingOrderObj.hrs} {bookingOrderObj.hrs > 1 ? "Hours" : "Hour"}
            </div>
          </div>
        </div>
        {/*  */}

        <div className="flex-column right-column pos-rel ">
          <h6 className="font-strong">Payment Info</h6>
          {paymentSuccess === false && (
            <>
              <div className="flex pay-info-section">
                <div className="flex-column left-column">
                  <div className="pos-rel">
                    <Input
                      id="input-with-icon-adornment"
                      placeholder={`Turf Cost ${bookingOrderObj.turfCost}`}
                      disabled
                    />
                  </div>
                  <div className="pos-rel mt10 mt1rem">
                    <Input
                      id="input-with-icon-adornment"
                      placeholder={`Coupon Cost ${bookingOrderObj.couponCost}`}
                      disabled
                    />
                  </div>

                  <div className="pos-rel mt10 mt1rem">
                    <Input
                      id="input-with-icon-adornment"
                      placeholder={`Advance paid ${bookingOrderObj.advpaid}`}
                      disabled
                    />
                  </div>
                  <div className="pos-rel mt10 mt1rem">
                    <Input
                      id="input-with-icon-adornment"
                      placeholder={`Balance  Amount ${bookingOrderObj.balAmount}`}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex-column right-column pos-rel ">
                  <div className="pos-rel">
                    {type === "pay" ? (
                      bookingOrderObj.balAmount > 0 && (
                        <Input
                          id="input-with-icon-adornment"
                          disabled={
                            `${bookingOrderObj.balAmount} > 0 ` ? false : true
                          }
                          placeholder={`${
                            type === "pay" ? "Enter Paid" : "Refund"
                          } Amount`}
                          startAdornment={
                            <InputAdornment position="start">
                              <CurrencyRupeeIcon />
                            </InputAdornment>
                          }
                          value={`${type !== "pay" ? 0 : paidAmount}`}
                          onChange={(e) => balanceAmount(e.target.value, type)}
                        />
                      )
                    ) : (
                      <Input
                        id="input-with-icon-adornment"
                        placeholder={`${
                          type === "pay" ? "Enter Paid" : "Refund"
                        } Amount`}
                        startAdornment={
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon />
                          </InputAdornment>
                        }
                        value={`${
                          type !== "pay"
                            ? bookingOrderObj.balAmount === 0
                              ? ""
                              : bookingOrderObj.balAmount
                            : paidAmount
                        }`}
                        onChange={(e) => balanceAmount(e.target.value, type)}
                      />
                    )}

                    {paidAmountErr !== "" && (
                      <p className="errmsg">{paidAmountErr}</p>
                    )}
                  </div>

                  <div className="pos-rel mt20">
                    {type === "pay" && bookingOrderObj.balAmount > 0 && (
                      // <Input
                      //   id="input-with-icon-adornment"
                      //   placeholder="Paid via"
                      //   value=""
                      //   onChange={(e) => "" }
                      // />
                      <> 
                        <Select
                        variant="standard"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={paidvia}
                          label="Paid Via"
                          onChange={(e) => pay_via(e.target.value)}
                          defaultValue={paidvia}
                          fullWidth
                        >
                          <MenuItem value="0">Paid Via</MenuItem>
                          <MenuItem value="PhonePay">PhonePay</MenuItem>
                          <MenuItem value="Gpay">GPay</MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                      </>
                    )}

                    {paidviaErrMsg !== "" && (
                      <p className="errmsg">{paidviaErrMsg}</p>
                    )}
                  </div>
                  <div className="pos-rel mt10">
                    {type === "pay" && bookingOrderObj.balAmount > 0 && (
                      (paidvia !== 'Cash' && paidvia !== '0') && (
                        <Input
                        id="input-with-icon-adornment"
                        placeholder={`Enter ${paidvia} Number`}
                        value={transActionNumber}
                        onChange={(e) => handlePaidNumber(e.target.value) }
                      /> 
                      )                      
                    )}

                    {transActionNumberErrMsg !== "" && (
                      <p className="errmsg">{transActionNumberErrMsg}</p>
                    )}
                  </div>

                  <div className="pos-rel mt10">
                    {type === "pay" ? (
                      bookingOrderObj.balAmount > 0 && (
                        <Button
                          variant="contained"
                          endIcon={<CheckCircleIcon />}
                          onClick={() => payBalance()}
                          disabled={disabledSubmit}
                          fullWidth
                          className="submit-payment-btn"
                        >
                          Sumit
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<ThumbDown />}
                        onClick={() => CancelOrder()}
                        className="cancel-order-btn "
                        fullWidth
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {paymentSuccess === true && (
            <Alert
              onClose={() => {
                closeModal(paymentSuccess);
              }}
              severity="success"
            >
              Payment has been successfully completed
            </Alert>
          )}
        </div>
      </div>
      {modalOpen === true && (
        <>
          <SILConfirmModal
            setModalOpen={setModalOpen}
            handlePayBalanceAmount={payBalanceAmount}
            confirmMsg={`Are you sure you want to proceed with ${paidAmount} out of ${bookingOrderObj.balAmount} rupees`}
          />
        </>
      )}
    </>
  );
}

export default PayCancel;
