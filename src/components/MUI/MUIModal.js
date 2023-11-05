import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function MUIModal(props, comp = null) {
  console.log("comp is:", comp);
console.log('props are:', props)
  const modalStyle = {
    position: "absolute",
    top: props.params.adjustTop ?? "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.params.width ? props.params.width : 650,
    boxShadow: 24,
    borderRadius: 1,
    p: 2,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.params.open}
      onClose={props.params.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.params.open}>
        <Card className= {`${!props.params.width ? "cardBox modal-md" : ""}`} sx={modalStyle}>
          <CardContent className="assignsection-card">
            <div className="pt10 modal-body">
              <span className={`modal-close-btn  ${props.params.closebtncls}`} >
                <ClearIcon onClick={props.params.handleClose} />
              </span>
              {props.params.showTitle && (
                <Typography
                  className="modal-title"
                  variant="h5"
                  gutterBottom
                  component="div"
                >
                  {props.params.modalTitle}
                </Typography>
              )}
              
              {props.params.compLoaded === true
                ? props.params.component()
                : props.params.component(props)}
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}

export default MUIModal;
