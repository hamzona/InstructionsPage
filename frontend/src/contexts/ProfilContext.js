import React, { createContext, useReducer } from "react";

export const ProfilContext = createContext();

function profilUpdate(state, action) {
  switch (action.type) {
    case "setProfil":
      return action.payload;
    default:
      return state;
  }
}
export function ProfilContextProvider({ children }) {
  const [profilData, dispatch] = useReducer(profilUpdate, null);
  // console.log(profilData);
  return (
    <ProfilContext.Provider value={{ dispatch, profilData }}>
      {children}
    </ProfilContext.Provider>
  );
}
