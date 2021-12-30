import logo from "./logo.svg";
import "./App.css";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { clinicIDs } from "./config";
import { textAlign } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const App = () => {
  useEffect(() => {}, []);

  const [phone, setPhone] = useState();
  const [zipCode, setZipCode] = useState();
  const [provider, setProvider] = useState();

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "4vh",
          backgroundColor: "#F7717D",
          fontSize: 40,
          fontFamily: "Helvetica-Bold",
          color: "#E1E5F2",
          textAlign: "left",
          paddingLeft: "5px",
          borderRadius: '2px',
        }}
      >
        CVS Appointment Finder 🥸🥴😈
      </div>
      <div style={{ paddingTop: "10px" }}></div>
      Hi Frineds! Please enter in your zip code and phone number and we'll let
      you know when an appointment is available at your nearest CVS! :)
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              height: "100%",
            }}
          >
            <TextField
              id="standard-basic"
              label="Zip Code"
              variant="standard"
              value={zipCode}
              onChange={handleZipCodeChange}
            />
            <TextField
              id="standard-basic"
              label="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              variant="standard"
            />
            <div style={{ paddingBottom: "20px" }}></div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Phone Provider
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={provider}
                label="Phone Provider"
                onChange={handleProviderChange}
              >
                <MenuItem value={10}>
                  <div style={{ textAlign: "left" }}>Verizon</div>
                </MenuItem>
                <MenuItem value={20}>
                  <div style={{ textAlign: "left" }}>AT&T</div>
                </MenuItem>
                <MenuItem value={30}>
                  <div style={{ textAlign: "left" }}>T-Mobile</div>
                </MenuItem>
              </Select>
            </FormControl>
            {zipCode}
            {phone}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default App;
