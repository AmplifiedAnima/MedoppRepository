import { useContext, useEffect, useState } from "react";
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
  const [refreshedToken, setRefreshedToken] = useState("");
  const refreshTokenLogic = async (accessToken: string): Promise<string> => {
    try {
      const response = await fetch("http://localhost:3000/auth/refresh-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: accessToken,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setRefreshedToken(data.accesToken);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
    return refreshedToken;
  };
  let loginToken = localStorage.getItem("token");

  useEffect(() => {
    if (loginToken && !isLoggedIn) {
      refreshTokenLogic(loginToken);

      if (refreshedToken) {
        localStorage.setItem("token", refreshedToken);
      }

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
        clearUserDataAndLogout();
      }
      return;
    }
  }, [loginToken, !isLoggedIn]);

  const clearUserDataAndLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setRoles([]);
    setAvatarImage("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setCity("");
    setCv("");
    setIsLoggedIn(false);
  };
};
