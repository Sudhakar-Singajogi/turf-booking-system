import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
// import ConfigureTurfs from "./ConfigureTurfs";
// import AddSportToTurf from "./AddSportToTurf";
import { useEffect } from "react";
import ManageSportToTurf from "./ManageSportToTurf";
import ConfigureCoupons from "../ConfigureCoupons";
import ConfigureTurfs from "./ConfigureTurfs";

export default function AccordionConfigure() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Turf Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* have to refactor the configure turf component using context api */}
          <ConfigureTurfs key="turfs" dntrerender={true} />
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sports To Turf</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ManageSportToTurf  key="sports" dntrerender={true}/>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Manage Coupons</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <ConfigureCoupons key="coupons" dntrerender={true}/>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </>
  );
}
