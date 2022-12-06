import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../../utils/localStorage";
import { signIn } from "../../api/index";
import { Context } from "../../context/context";
import "../../assets/generalStyles.css";
import "../pages.css";

const SignIn = () => {
  const errorMessage = "";
  const { setToken } = useContext(Context);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(values);
    setToken(updateToken(response.data.user.token));
    navigate("/home");
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
            <h2> Sign In </h2>
            <Link to="/sign-up">
              {" "}
              <p>Need an account? </p>
            </Link>
          </div>
        </div>
        <input
          type="text"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleInputValue}
          required
          placeholder="Your Email..."
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
        <input type="submit" value="Sign In" style={{ float: "right" }} />
      </form>
    </div>
  );
};

export default SignIn;
