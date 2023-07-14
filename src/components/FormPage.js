import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
// import '../App.css';

function FormPage() {
  const [fields, setFields] = useState({})
  let formElements = localStorage.getItem("formElements");
  let retArray = JSON.parse(formElements);
  // console.log(retArray);

  const saveData = () =>{
    let userData = JSON.stringify(fields);
    localStorage.setItem("userData", userData);
  }
  const handleChange = (e) =>{
    let fieldObj = { ...fields };
    fieldObj[e.target.name] = e.target.value;
    console.log('fieldObj',fieldObj);
    setFields(fieldObj)
  }
  return (
    <>
      <h2>Actual Form</h2>
      <hr />
      {/* <div className="app"> */}
      <div className="login-page">
        <Form>
          {retArray?.map((ele, i) =>(
            ele.type == "text" ? 
              (
              
                <Form.Group controlId="formUsername">
                  <Form.Label>{ele.text}</Form.Label>
                  <Form.Control
                    type={ele.type}
                    // value={username}
                    name={i}
                    onChange={(e) => handleChange(e)}
                    placeholder={ele.text}
                  />
                </Form.Group>
              )
             : (
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select an option</Form.Label>
                <Form.Select name={i} custom onChange={(e) => handleChange(e)}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Form.Select>
              </Form.Group>
            )
          ))}
          <Button variant="primary" onClick={saveData}>
            save
          </Button>
        </Form>
      </div>
      {/* </div> */}
    </>
  );
}

export default FormPage;
