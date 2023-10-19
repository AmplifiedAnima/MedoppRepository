import { useContext, useEffect } from "react";
import { IsLoggedInContext } from "./IsLoggedInContext";
import { Buffer } from "buffer";

export const UserAlreadyLoggedInHandler = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setRoles,
    setUsername,
    setPhoneNumber,
    setLastName,
    setFirstName,
    setAddress,
    setCity,
    setAvatarImage,
    setCv,
    setEmail,
  } = useContext(IsLoggedInContext);

  const loginToken = localStorage.getItem("token");

  useEffect(() => {
    if (loginToken && !isLoggedIn) {
      const tokenPayload = JSON.parse(
        Buffer.from(loginToken.split(".")[1], "base64").toString("utf-8")
      );
      const expirationTime = tokenPayload.exp * 1000;
      if (Date.now() < expirationTime) {
        setUsername(tokenPayload.username);
        setRoles(tokenPayload.roles);
        setAvatarImage(tokenPayload.avatarImage);
        setFirstName(tokenPayload.firstName);
        setLastName(tokenPayload.lastName);
        setPhoneNumber(tokenPayload.phoneNumber);
        setEmail(tokenPayload.email);
        setAddress(tokenPayload.address);
        setCity(tokenPayload.city);
        setCv(tokenPayload.cv);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      return;
    }
  }, [loginToken, !isLoggedIn]);
};
