import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginCard = () => {
  const URL = `http://localhost:3001/signup`;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitted) {
      setIsSubmitted(true);

      axios
        .get(URL)
        .then((res) => {
          if (res.status === 200) {
            const usersData = res.data;
            const foundUser = usersData.find(
              (userdata) =>
                userdata.email === value.email &&
                userdata.password === value.password
            );
            if (foundUser) {
              alert("Login Successful.");
            } else {
              alert("Login failed. Please check your email and password.");
            }
          } else {
            console.log("Login failed");
            alert("Login failed. Please try again.");
          }
          setIsSubmitted(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed. Please try again.");
          setIsSubmitted(false);
        });
    }
  };

  return (
    <>
      <div className="login">
        <h2 className="login-text ">Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="email-input">
            <label className="input-text">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="youremail@address.com"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label className="input-text">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="*********"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {/* <div className="text-end forgot-password"> */}
          <a href="#" className="forgot_password">
            {" "}
            Forget password{" "}
          </a>
        </form>
        {/* </div> */}
        <div className="center">
          <button className="submit-button">Continue</button>
        </div>
        <div className="center sign-up">
          <span>
            {" "}
            

            New to NeoSTORE? <a href="/signup">Sign up</a>{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
