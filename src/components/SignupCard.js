import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
  const URL = `http://localhost:3001/signup`;

  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    if (!value.agreedToTerms) {
      alert("Please agree to the terms and conditions before continuing");
      return;
    }

    const subdataToAdd = {
      id: Math.random(),
      ...value,
    };

    axios
      .post(`${URL}/1/subdata`, subdataToAdd)
      .then((res) => {
        setValue(res.data);
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValue((prev) => ({ ...prev, [name]: checked }));
  };

  // const continueSignup = () => {
  //   fetch('https://api.dummyjson.com/auth/signup', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       firstname,
  //       lastname,
  //       email,
  //       password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);
  // };

  return (
    <>
      <div className="signup">
        <h2 className="login-text text-red">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="email-input">
            <label className="input-text">New Account Register</label>
            <input
              type="text"
              placeholder="First Name"
              id="firstname"
              name="firstname"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              id="lastname"
              name="lastname"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="terms-and-conditions">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsAndConditions"
              checked={value.agreedToTerms}
              onChange={handleCheckboxChange}
              onClick={() =>
                setValue((prev) => ({
                  ...prev,
                  agreedToTerms: !prev.agreedToTerms,
                }))
              }
            />
            <label className="form-check-label" htmlFor="termsAndConditions">
              I agree to the terms and conditions.
            </label>
          </div>

          <div className="center">
            <button className="submit-button">Continue</button>
          </div>
          <div className="center sign-up">
            <span>
              Already have an account? <a href="/">Log in</a>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupCard;
