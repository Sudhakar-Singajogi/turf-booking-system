import { memo } from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; 


const VenueCard = memo(function VenueCard() {
    return (
      <div className="venue-card">
        <div className="venue-image">
          <img src="assets/pngs/venue.png" alt="Venue Images" />
        </div>
        <div className="venue-details">
          <div className="tx-left">
            <p>Venue Name @ Uppal</p>
            <p> 9:00 AM - 9:00 PM</p>
          </div>
  
          <div className="tx-right">
            <p>Total Turfs: 3</p>
            <p>
              <SportsCricketIcon sx={{ color: "gray" }} />
              <SportsSoccerIcon sx={{ color: "gray" }} />
            </p>
          </div>
        </div>
        <button className="book-button">View Details</button>
      </div>
    );
  });
  
  export default VenueCard;