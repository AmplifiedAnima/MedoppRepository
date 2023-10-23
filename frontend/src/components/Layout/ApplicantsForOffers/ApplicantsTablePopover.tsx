import React from "react";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface  ApplicantsTablePopoverProps {
  content: string;
  themeMode: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const ApplicantsTablePopover: React.FC< ApplicantsTablePopoverProps> = ({
  content,
  themeMode,
  anchorEl,
  onClose,
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          width: "350px",
          height: "400px",
          color: themeMode === "dark" ? "white" : "black",
          background:
            themeMode === "dark"
              ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)"
              : "#FFFFFF",
          borderRadius: "0",
        }}
      >
        <Box
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            padding: "40px",
            color: themeMode === "dark" ? "white" : "black",
            borderRadius: "0",
          }}
        >
          <Typography
            sx={{
              color: themeMode === "dark" ? "white" : "black",
            }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Popover>
  );
};

export default ApplicantsTablePopover;
