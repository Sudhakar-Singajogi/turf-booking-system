import React, { useEffect, useRef } from "react";
import { useState } from "react";
import EditCoupon from "./ConfigureArena/EditCoupon";
import AddCoupon from "./ConfigureArena/AddCoupon";
import Tooltip from "@mui/material/Tooltip";
import useDateTimeRealated from "../../CustomHooks/useDateTimeRealated";

import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import useCoupons from "../../CustomHooks/useCoupons";
import { useLoaderContext } from "../../contexts/LoaderContextProvider";

function ConfigureCoupons({...props}) {
  const [couponId, setCouponId] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const { GetAllCouponsByArena } = useCoupons();
  const gotCoupons = useRef(false);
  const { isLoading, setLoader } = useLoaderContext();
  const { dateTimeToyearMonthDay } = useDateTimeRealated();

  useEffect(() => {
    const getAllCoupons = async () => {
      console.log("yeah first time");
      let resp = await GetAllCouponsByArena();
      setCoupons(resp);
      gotCoupons.current = true;
    };
    // setLoader(false);
    if (gotCoupons.current === false) {
      getAllCoupons();
    }
  }, [couponId]);

  const updateCoupon = (id) => {
    if (couponId !== id) {
      console.log("id:", id);
      setCouponId(() => id);
      setLoader(true);

      setTimeout(() => {
        setLoader(false);
      }, 100);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <h6 className="accodion-sub-title">Turfs Available</h6> */}
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            className="show-till-tablet"
          >
            Available Coupons
          </Typography>

          <List dense={false} key="coupon-listing">
            {coupons.length > 0 &&
              coupons.map((coupon, index) => {
                return (
                  <ListItem
                    key={coupon.couponId}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => updateCoupon(coupon.couponId)}
                          className="manage-btns-l"
                          sx={{ mx: 3 }}
                        >
                          {index === 0 ? (
                            <Tooltip
                              title="Edit & View"
                              sx={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-edit "></i>
                            </Tooltip>
                          ) : (
                            <i
                              className="fas fa-edit "
                              sx={{ cursor: "pointer" }}
                            ></i>
                          )}
                        </IconButton>

                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className="manage-btns-r"
                          sx={{ mx: -4.5 }}
                          //   onClick={() => deleteTurf(turf.turfId)}
                        >
                          {index === 0 ? (
                            <Tooltip
                              title="Delete Coupon"
                              sx={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-trash-alt "></i>
                            </Tooltip>
                          ) : (
                            <i
                              className="fas fa-trash-alt "
                              sx={{ cursor: "pointer" }}
                            ></i>
                          )}
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      sx={{ cursor: "pointer" }}
                      primary={
                        <>
                          {index === 0 ? (
                            <Tooltip title="Coupon Name">
                              {coupon.couponName}
                            </Tooltip>
                          ) : (
                            coupon.couponName
                          )}
                        </>
                      }
                    />

                    <ListItemText
                      sx={{ cursor: "pointer" }}
                      primary={
                        <>
                          {index === 0 ? (
                            <>
                              <Tooltip title="Coupon Availablity">
                                {`${dateTimeToyearMonthDay(
                                  coupon.offerStartsAt
                                )} - ${dateTimeToyearMonthDay(
                                  coupon.offerEndAt
                                )} `}
                              </Tooltip>
                            </>
                          ) : (
                            `${dateTimeToyearMonthDay(
                              coupon.offerStartsAt
                            )} - ${dateTimeToyearMonthDay(coupon.offerEndAt)} `
                          )}
                        </>
                      }
                    />

                    <ListItemText
                      sx={{ cursor: "pointer" }}
                      primary={
                        <>
                          {index === 0 ? (
                            <Tooltip title="Coupon Cost">
                              {`${coupon.offer}%`}
                            </Tooltip>
                          ) : (
                            `${coupon.offer}%`
                          )}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>

          {couponId === 0 && <AddCoupon />}
          {couponId > 0 && (
            <EditCoupon couponId={couponId} updateCoupon={updateCoupon} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(ConfigureCoupons);
