import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import GrassIcon from "@mui/icons-material/Grass";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ThumbDown } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function PayCancel({ type, bookingOrderObj }) {
  console.log("bookingOrderObj:", bookingOrderObj);

  const inputDate = new Date(bookingOrderObj.bookedOn);
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

  const formattedDate = `${month}-${day}`;

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
          <div className="pos-rel mt10">
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
          <div className="pos-rel mt10">
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
          <div className="flex ">
            <div className="flex-column left-column">
              <div className="pos-rel">
                <Input
                  id="input-with-icon-adornment"
                  placeholder= {`Turf Cost ${bookingOrderObj.turfCost}`} 
                  disabled
                />
              </div>
              <div className="pos-rel mt10">
                <Input
                  id="input-with-icon-adornment"
                  placeholder={`Coupon Cost ${bookingOrderObj.couponCost}`} 
                  disabled
                />
              </div>
            </div>
            <div className="flex-column right-column pos-rel ">
              <div className="pos-rel">
                <Input
                  id="input-with-icon-adornment"
                  placeholder={`Advance paid ${bookingOrderObj.advpaid}`} 
                  disabled
                />
              </div>
              <div className="pos-rel mt10">
                <Input
                  id="input-with-icon-adornment"
                  placeholder={`${
                    type === "pay" ? "Balance " : "Cancel"
                  } Amount ${bookingOrderObj.balAmount}`}
                  startAdornment={
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          {type === "pay" ? (
            <Button variant="contained" endIcon={<CheckCircleIcon />}>
              Sumit
            </Button>
          ) : (
            <Button variant="contained" endIcon={<ThumbDown />}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default PayCancel;
