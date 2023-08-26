import React, { useEffect, useState } from "react";
import "./ConfigureArena.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccordionConfigure from "./ConfigureArena/AccordionConfigure";
import ConfigureTurfs from "./ConfigureArena/ConfigureTurfs";

function ConfigureArena() {
  // Initial check when the component mounts

  return (
    <>
      <div className="columns-container show-from-tablet">
        <Card className="configure-items" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>

            <ConfigureTurfs />
             
          </CardContent>

          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>

        <Card className="configure-items" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card className="configure-items" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>

      <div className="columns-container show-till-tablet">
        <AccordionConfigure />


      </div>
    </>
  );
}

export default ConfigureArena;
