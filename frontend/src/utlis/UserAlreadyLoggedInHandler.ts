import { useContext, useEffect } from "react";
import { IsLoggedInContext } from "./IsLoggedInContext";
import { Buffer } from "buffer";

export const UserAlreadyLoggedInHandler = () => {
  const {
    setIsLoggedIn,
    setRoles,
    setUsername,
    setPhoneNumber,
    setLastName,
    setFirstName,
    setAddress,
    setCity,
    setCv,
    setEmail,
  } = useContext(IsLoggedInContext);


  useEffect(() => {
    const loginToken = localStorage.getItem("token");

    if (loginToken) {
      const tokenPayload = JSON.parse(
        Buffer.from(loginToken.split(".")[1], "base64").toString("utf-8")
      );
      setUsername(tokenPayload.username);
      setRoles(tokenPayload.roles);
      setFirstName(tokenPayload.firstName);
      setLastName(tokenPayload.lastName);
      setPhoneNumber(tokenPayload.phoneNumber);
      setEmail(tokenPayload.email);
      setAddress(tokenPayload.address);
      setCity(tokenPayload.city);
      setCv(tokenPayload.cv);
      setIsLoggedIn(true);
    }
  }, []);
};
