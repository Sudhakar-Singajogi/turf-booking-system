import React from "react";
import Dashboard from "./Dashboard";
import MUIDrawer from "../MUI/MUIDrawer";
import BookingForm from "../BookingForm";
import { useSelector } from "react-redux";
import BookedSlots from "./Dashboard/BookedSlots";
import ManageSlots from "./Dashboard/ManageSlots";

function BookSlot() {
  const { admin } = useSelector((state) => state.venue);
  return (
    <>
      <div className="containers">
        <div className="div-a show-fullwidth-mobile">
            <BookingForm venue={admin.info.arena_id} />
        </div>
        <div className=" div-b dnt-show-mble nullify-margins nullify-margins">
          <div className="booking-cart-wrapper column right-column">
            <BookedSlots />
          </div>
          <div className="booking-cart-wrapper column right-column">
            <ManageSlots />

          </div>

        </div>
      </div>
      {/* <Dashboard/>
    <MUIDrawer
        open={true} 
        component={<BookingForm venue={admin.info.arena_id} />}
      /> */}
    </>
  );
}

export default BookSlot;
