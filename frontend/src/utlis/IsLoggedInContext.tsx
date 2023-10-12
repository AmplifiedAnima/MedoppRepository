import React, { createContext, useState } from "react";

type IsLoggedInContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
  username: string;
  setUsername: (value: string) => void;
  roles: string[];
  setRoles: (value: string[]) => void;
  avatarImage: string;
  setAvatarImage: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phoneNumber: string; // Added phoneNumber
  setPhoneNumber: (value: string) => void; // Added setPhoneNumber
  email: string; // Added email
  setEmail: (value: string) => void; // Added setEmail
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  cv: string;
  setCv: (value: string) => void;
};

export const IsLoggedInContext = createContext<IsLoggedInContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
  username: "",
  setUsername: () => {},
  roles: [],
  setRoles: () => {},
  avatarImage: "",
  setAvatarImage: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  phoneNumber: "", // Added phoneNumber
  setPhoneNumber: () => {}, // Added setPhoneNumber
  email: "", // Added email
  setEmail: () => {}, // Added setEmail
  address: "",
  setAddress: () => {},
  city: "",
  setCity: () => {},
  cv: "",
  setCv: () => {},
});

type IsLoggedInContextProviderProps = {
  children: React.ReactNode;
};

export const IsLoggedInContextProvider: React.FC<
  IsLoggedInContextProviderProps
> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Added phoneNumber
  const [email, setEmail] = useState<string>(""); // Added email
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cv, setCv] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");

  return (
    <IsLoggedInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
        username,
        setUsername,
        roles,
        setRoles,
        avatarImage,
        setAvatarImage,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        address,
        setAddress,
        city,
        setCity,
        cv,
        setCv,
      }}
    >
      {children}
    </IsLoggedInContext.Provider>
  );
};
