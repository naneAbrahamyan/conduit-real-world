/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { getToken } from "../utils/localStorage";
import jwt_decode from "jwt-decode";

export const Context = createContext({
  token: getToken(),
  userName: "",
  setToken: () => "",
  user: {},
  getUser: () => "",
});

const ContextProvider = (props) => {
  const [token, setToken] = useState(getToken());
  const userName = token ? jwt_decode(token).username : "";

  return (
    <Context.Provider value={{ token, setToken, userName }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
