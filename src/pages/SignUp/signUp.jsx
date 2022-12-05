import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { updateToken } from "../../utils/localStorage";
import { signUp } from "../../api/index";
import { Context } from "../../context/context";
import "../../assets/generalStyles.css";
import "../pages.css";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(Context);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(values);
      setToken(updateToken(response.data.user.token));
      navigate("/home");
    } catch (ex) {
      setErrorMessage(e.response?.data?.message || "Something went wrong");
    }
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="general-form">
      <form onSubmit={handleFormSubmit}>
        <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>
        <div className="center-div">
          <div className="text-elements-style">
            <h2> Sign Up </h2>
            <Link to="/sign-in">
              {" "}
              <p>Need an account? </p>
            </Link>
          </div>
        </div>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleInputValue}
          required
          placeholder="Your Email..."
        />
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleInputValue}
          required
          placeholder="Your Username..."
        />

        <input
          name="password"
          value={values.password}
          onChange={handleInputValue}
          type="password"
          label="Password"
          required
          placeholder="Your Password..."
        />
        <input type="submit" value="Sign Up" style={{ float: "right" }} />
      </form>
    </div>
  );
};

export default SignUp;
