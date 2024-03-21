import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    alert("got the number!!");
    if (number === "" || number === undefined)
      return setError("Please Enter a valid Phone Number!");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };
  console.log(number);

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form  style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container" />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button> &nbsp;
            </Link>
            <Button variant="primary" onClick={getOtp}>Send OTP</Button>
          </div>
        </Form>

        <Form style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicotp">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button> &nbsp;
            </Link>
            <Button variant="primary" onClick={verifyOtp}>Verify OTP</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;
