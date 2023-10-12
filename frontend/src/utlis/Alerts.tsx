import React from "react";
import { Box, Alert } from "@mui/material";
import { useAlertContext } from "./AlertHandlingContext";

const AlertLayout = () => {
  const { messages, dispatch } = useAlertContext();
  const closingTheAlert = () => {dispatch({type:'CLEAR_ALERTS'})}
  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      {messages.error && (
        <Alert severity="error" onClose={closingTheAlert}>
          {messages.error}
        </Alert>
      )}
      {messages.success && (
        <Alert severity="success" onClose={closingTheAlert}>
          {messages.success}
        </Alert>
      )}
      {messages.warning && (
        <Alert severity="warning" onClose={closingTheAlert}>
          {messages.warning}
        </Alert>
      )}
    </Box>
  );
};

export default AlertLayout;
