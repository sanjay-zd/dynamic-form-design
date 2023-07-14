import React from "react";
import { Button, Form } from "react-bootstrap";
// import '../App.css';

function FormPage() {
  let formElements = localStorage.getItem("formElements");
  let retArray = JSON.parse(formElements);
  console.log(retArray);
  return (
    <>
      <h2>Actual Form</h2>
      <hr />
      {/* <div className="app"> */}
      <div className="login-page">
        <Form>
          {retArray.map((ele) =>(
            ele.type == "text" ? 
              (
                <Form.Group controlId="formUsername">
                  <Form.Label>{ele.text}</Form.Label>
                  <Form.Control
                    type={ele.type}
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    placeholder={ele.text}
                  />
                </Form.Group>
              )
             : (
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select an option</Form.Label>
                <Form.Select custom>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Form.Select>
              </Form.Group>
            )
          ))}
          {/* <Button variant="primary" type="submit">
            Login
          </Button> */}
        </Form>
      </div>
      {/* </div> */}
    </>
  );
}

export default FormPage;
