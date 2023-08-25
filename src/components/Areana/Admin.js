import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LeftNavigation from "./LeftNavigations";
import "./Admin.css";
import TopNav from "./TopNav";
import AdminFooter from "./AdminFooter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Divider } from "@mui/material";

function Admin() {
  const [adjustrightcontent, setAdjustrightcontent] = useState("");
  const { admin } = useSelector((state) => state.venue);
  const navigate = useNavigate();
  console.log("admin object is:", admin);

  useEffect(() => {
    console.log("admin info: ", Object.keys(admin.info).length);
    if (parseInt(Object.keys(admin.info).length) === 0) {
      window.location.href = "/arena-login";
    }
  }, [admin.info]);

  return (
    <>
      <div className="app">
        <LeftNavigation setAdjustrightcontent={setAdjustrightcontent} />
        <div className={`right-container ${adjustrightcontent}`}>
          <TopNav />
          <div className="right-content">
            <div className="breadcrumb">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  MUI
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
              </Breadcrumbs>
            </div>
            <Divider style={{background:"##dfdfdf"}} />
            <div style={{marginTop:'10px'}}>

            </div>

            <Outlet />
          </div>
          {/* <div className="adminfooter">
          <AdminFooter />

        </div> */}
        </div>
      </div>
    </>
  );
}

export default Admin;
