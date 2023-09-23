import { Outlet } from "react-router-dom";
import BookedSlots from "./Dashboard/BookedSlots";
import "./Dashboard.css";
import YearlyBookings from "./Dashboard/YearlyBookings";
import { Divider } from "@mui/material";
import { faker } from "@faker-js/faker";
import MonthlyBookings from "./Dashboard/MonthlyBookings";
import { WeeklyBookings } from "./Dashboard/WeeklyBookings";

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Yearly Bookings",
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

const labels = ["January", "February", "March", "April"];

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
      <div className="dashboard-container">
        <div className="chart-container">
          <div className="chart">
            <WeeklyBookings />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart">
            <YearlyBookings options={options} data={data} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <MonthlyBookings>
              <label>Monthly Bookings</label>
            </MonthlyBookings>
          </div>
        </div>
      </div>
      <Divider style={{ marginBottom: "20px" }} />
      <div className="dashboard-container">
        <div className="slots-container">
          <BookedSlots />
        </div>
        <div className="slots-container">
           
        </div>
        <div className="slots-container">
           
        </div>
      </div>
    </>
  );
}

export default Dashboard;
