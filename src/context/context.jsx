/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { getToken } from "../utils/localStorage";
export const Context = createContext({
  token: getToken(),
  setToken: () => "",
  user: {},
  getUser: () => "",
});

const ContextProvider = (props) => {
  const [token, setToken] = useState(getToken());

  return (
    <Context.Provider value={{ token, setToken }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
