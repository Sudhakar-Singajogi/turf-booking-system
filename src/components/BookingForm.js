import React, { useEffect, useState } from "react";
import "./BookingForm.css";
import { useDispatch, useSelector } from "react-redux";
import { getVenuDetails } from "../Redux/Slices/BokingSliceReducer";

import IncrementDecrement from "./IncrementDecrement";
import SelectGame from "./CustomComp/SelectGame";
import SelectTurf from "./CustomComp/SelectTurf";

import { closeSuccessMsg } from "../Redux/Slices/BookingFormValidatorReducer";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { clearErrors } from "../Redux/Slices/BookingFormValidatorReducer";

import CartFooter from "./CartFooter";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import { useLoaderContext } from "../contexts/LoaderContextProvider";
import BookingDatePicker from "./Booking/BookingDatePicker";
import BookingTimePicker from "./Booking/BookingTimePicker";
import "bootstrap/dist/css/bootstrap.min.css";
import CartPaymentPolicy from "../CartPaymentPolicy";
import Loader from "./Loader";

const BookingForm = ({ venue }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const venueId = venue !== "" ? venue : searchParams.get("venueid");

  // const venueId = searchParams.get("venueid");
  const [isRendered, setIsRendered] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);

  const [isAdmin, setIsAdmin] = useState(venue !== "" ? true : false);
  const { isLoading, setLoader } = useLoaderContext();

  const [showConfirm, setShowConfirm] = useState(false);

  const showConfirmSlot = () => {
    setShowConfirm(true);
  };

  const toggleLoader = (val) => {
    setLoader(val);
  };

  useEffect(() => {
    toggleLoader(true);
    setIsRendered(false);
    const getVenue = async () => {
      dispatch(getVenuDetails(venueId));
      toggleLoader(false);
      setIsRendered(true);
    };

    if (venueId.trim() !== "") {
      getVenue();
    }
  }, []);

  const bookingSuccess = useSelector(
    (state) => state.validateForm.bookingSuccess
  );

  if (venueId === "") {
    return (
      <>
        <div className="booking-cart-wrapper column right-column">
          <div className="booking-form-container ">
            <div className="div-a ">
              <NotFound message="Oops! Could not find the venue identifier" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!data.venuedetails?.arena_name) {
    return (
      <>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  if (data.venuedetails.hasOwnProperty("arena_id") === false && isRendered) {
    return (
      <>
        <div className="booking-cart-wrapper column right-column">
          <div className="booking-form-container ">
            <div className="div-a ">
              <NotFound message="Oops! The venue  does not exist." />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="booking-cart-wrapper column right-column">
        <div className="booking-form-container ">
          <div className="div-a ">
            {showConfirm === false ? (
              <>
                <div className="w100">
                  <Stack sx={{ marginBottom: "1rem" }} spacing={2}>
                    {bookingSuccess !== "" ? (
                      bookingSuccess === true ? (
                        <>
                          <Alert
                            onClose={() => {
                              dispatch(closeSuccessMsg());
                            }}
                            sx={{ fontWeight: "bold" }}
                            severity="success"
                          >
                            Your slot has been successfully allocated
                          </Alert>
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      ""
                    )}
                  </Stack>
                  {/* <CartPaymentPolicy /> */}
                </div>

                <div className="form-container">
                  <div>
                    <h1 className="font-bold text-md text-xl text-typography pos-rel">
                      {data.venuedetails?.arena_name}
                      {!isLoading ? (
                        <CleaningServicesIcon
                          className="clear-form-fields"
                          onClick={() => {
                            dispatch(clearErrors());
                          }}
                        />
                      ) : null}
                    </h1>
                    <h6 style={{ fontWeight: "bold", color: "#999" }}>
                      {data.venuedetails?.arena_location}
                    </h6>
                  </div>
                  {/* Your form fields go here */}
                  <div className="form-fields mar-tp30">
                    <div>
                      <BookingDatePicker />

                      <SelectTurf
                        wid80={"w100"}
                        options={[]}
                        title={"Select Turf"}
                        onChange={(e) => {}}
                        defValue={""}
                      />
                      {errors.turf_error !== "" ? (
                        <p className="errmsg ">{errors.turf_error}</p>
                      ) : (
                        <p>&nbsp;</p>
                      )}

                      <BookingTimePicker />

                      <SelectGame
                        options={[]}
                        title={"Select Game"}
                        onChange={(e) => {}}
                        defValue={data.game}
                      />
                      {errors.game_error !== "" ? (
                        <p className="errmsg">{errors.game_error}</p>
                      ) : (
                        <p>&nbsp;</p>
                      )}

                      <IncrementDecrement
                        onDecrement={() => {}}
                        onIncrement={() => {}}
                      />
                      {errors.hrs_error !== 0 ? (
                        <p className="errmsg">{errors.hrs_error}</p>
                      ) : (
                        <p style={{ marginBottom: "30px" }}> </p>
                      )}
                    </div>
                  </div>
                </div>
                <CartFooter
                  isAdmin={isAdmin}
                  showConfirmSlot={showConfirmSlot}
                />
              </>
            ) : (
              <div className="admin-cart-policy">
                
                <CartPaymentPolicy isAdmin={isAdmin} />
              </div>
            )}
          </div>
          {/* <div className="div-b">
            <Cart />
          </div> */}
          <div className="show-mble">{/* <Cart />  */}</div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default BookingForm;
