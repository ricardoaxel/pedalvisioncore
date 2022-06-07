import React, { useContext, useReducer } from "react";
import { sessionReducer } from "./SessionReducer";
import { themes } from "./Themes";
const SessionContext = React.createContext();
export function useSession() {
  return useContext(SessionContext);
}
export const initialState = {
  //Page functionallity
  actualTheme: themes.lightTheme,
};
export function SessionProvider({ children }) {
  //This state (reducer) is for managing all the properties of the session
  const [sessionState, dispatch] = useReducer(sessionReducer, initialState);
  return (
    <SessionContext.Provider
      value={{ sessionState: sessionState, dispatch: dispatch }}
    >
      {children}
    </SessionContext.Provider>
  );
}
