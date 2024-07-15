import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Authentication from "./navigation/Authentication";
import Main from "./navigation/Main";
import Loading from "./navigation/Loading";
import { AuthContext } from "./context/AuthProvider";

// epKFrVylGEgznmEv

export default function App() {
  const { user, session } = useContext(AuthContext);

  console.log("user ------->>>", session?.user?.user_metadata?.name);
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Authentication />}
      {user == true && <Main />}
    </NavigationContainer>
  );
}
