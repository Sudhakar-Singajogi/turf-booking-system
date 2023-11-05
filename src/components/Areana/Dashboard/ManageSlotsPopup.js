import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PayCancel from "./PayCancel";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ManageSlotsPopup(props) {
  console.log("props are:", props);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeModal = (paymentSuccess=false) => {
    console.log("paymentSuccess:", paymentSuccess)
    props.handleClose(paymentSuccess)
  }

  return (
    <>
      {/* <hr className="hr-sonet" /> */}
      <div className="modal-wrapper mt10 wid-100-per pt10">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="modal-tabs-bg"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Pay balance" {...a11yProps(0)} />
              <Tab label="Cancel Slot" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel className="tab-body " value={value} index={0} >
            
            <PayCancel type="pay" bookingOrderObj={props.compProps} closeModal={closeModal}  />
          </CustomTabPanel>
          <CustomTabPanel className="tab-body" value={value} index={1}>
            
            <PayCancel type="cancel" bookingOrderObj={props.compProps} closeModal={closeModal} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default ManageSlotsPopup;
