import { Outlet } from "react-router-dom";
import BookedSlots from "./Dashboard/BookedSlots";
import "./Dashboard.css";
import YearlyBookings from "./Dashboard/YearlyBookings";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import MonthlyBookings from "./Dashboard/MonthlyBookings";
import { WeeklyBookings } from "./Dashboard/WeeklyBookings";
import ManageSlots from "./Dashboard/ManageSlots";

export const options = {
  animations: {
    tension: {
      duration: 1000,
      easing: "easeInBounce",
      from: 1,
      to: 0,
      loop: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        color: "000",
      },
    },
    title: {
      display: true,
      text: "Yearly Bookings",
      position: "left",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const options2 = {
  plugins: {
    title: {
      display: true,
      text: "Monthly Bookings",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["JAN", "FEB", "MAR", "APR"];

export const data = {
  labels,
  datasets: [
    {
      label: "Turf 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Turf 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Turf 3",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

function Dashboard() {
  return (
    <>
      <div className="dashboard-container mt20">
        <div className="slots-container flex-box">
          <BookedSlots />
        </div>
        <div className="slots-container add-margin-top10">
          <ManageSlots />
        </div>
        <div className="slots-container"></div>
      </div>
      <Divider style={{ margin: "10px 20px" }} />
      <div className="dashboard-container">
        <div className="chart-container">
          <div className="chart">
            <WeeklyBookings />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart">
            <div className="chart pos-rel">
              <FormControl className="select-month-filter" variant="standard">
                <InputLabel id="demo-simple-select-label">
                  Select Quarter
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value=""
                  label="Select Turf"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>First Quarter</MenuItem>
                  <MenuItem value={20}>Second Quarter</MenuItem>
                  <MenuItem value={30}>Third Quarter</MenuItem>
                </Select>
              </FormControl>
              <YearlyBookings options={options} data={data} />
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <div className="chart pos-rel">
              <FormControl className="select-month-filter" variant="standard">
                <InputLabel id="demo-simple-select-label">By Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value=""
                  label="Select Turf"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <MonthlyBookings></MonthlyBookings>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
