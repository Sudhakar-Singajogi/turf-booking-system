import React from "react";
import { Form } from "react-bootstrap";

class BootstrapDatePickerComponent extends React.Component {
  render() {
    return (
      <>
        <Form.Group controlId="dob">
          <Form.Label>Select Date</Form.Label>
          <Form.Control type="date" name="dob" placeholder="Date of Birth" />
        </Form.Group>
      </>
    );
  }
}

export default BootstrapDatePickerComponent;
