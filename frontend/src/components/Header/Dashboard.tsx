import React, { useContext } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ThemeContext } from "../../styles/ThemeProvider"; // Update the path to your ThemeContext file
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose, onLogout }) => {
  const { isLoggedIn, username, roles, avatarImage, firstName, lastName } =
    useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const itemTextColor = themeMode === "dark" ? "#1dc01d" : "#0072ba";
  const isEmployer = isLoggedIn && roles.includes("Employer");
  return (
    <Container>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "calc(100% - 400px)" : "100%",
          width: "400px",
          height: "100%",
          backgroundColor: themeMode === "dark" ? "#242f3e" : "white",
          color: itemTextColor,
          zIndex: 10000,
          transition: "left 0.3s ease",
        }}
      >
        {isOpen && (
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "370px",
            }}
          >
            {" "}
            {avatarImage && (
              <Avatar src={avatarImage} sx={{ width: 60, height: 60 }} />
            )}
            {firstName && lastName && (
              <Avatar>{`${firstName[0]}${lastName[0].toUpperCase()}`}</Avatar>
            )}
            {username && !firstName && !lastName && (
              <Avatar>{`${username[0].toUpperCase()}`}</Avatar>
            )}
            <Box>
              <Typography variant="subtitle1">
                User : {username}
                { '  '} {roles.toString().toUpperCase()}
              </Typography>
            </Box>
            <IconButton color="inherit" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ flex: "1", p: 2 }}>
          <List>
            <ListItem>
              <Link to="/edit-user-profile">
                <Button style={{ color: itemTextColor }}>Edit Profile</Button>
              </Link>
            </ListItem>
            {isEmployer && (
              <ListItem>
                <Link to="/new-job-offer">
                  <Button style={{ color: itemTextColor }}>
                    Add new job offer +
                  </Button>
                </Link>
              </ListItem>
            )}

            <ListItem>
              <Link to="/job-applications">
                <Button style={{ color: itemTextColor }}>
                  {isEmployer ? "JOB APPLICATIONS (Who applied?)" : "WHERE I APPLIED"}
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/user-offers">
                <Button style={{ color: itemTextColor }}>
                  {isEmployer && "My Offers"}
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Button onClick={onLogout} style={{ color: itemTextColor }}>
                LOGOUT
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
