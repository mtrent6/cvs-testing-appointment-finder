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
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

export const App = () => {
  useEffect(() => {}, []);

  const [phone, setPhone] = useState();
  const [zipCode, setZipCode] = useState();
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);

  const fetchClinics = async () => {
    setLoading(true);
    const clinics = await axios.post(
      "https://www.cvs.com/RETAGPV3/MCscheduler/V1/storeScheduler",
      null,
      { params: { addressLine: zipCode, mileRadius: 100, maxCount: 25 } }
    );
    setLoading(false);

    const details = clinics.data?.response?.clinicDetails;
    console.log(details);
    const reducedClinics = details.map((clinic) => {
      return {
        name: clinic.clinicName,
        id: clinic.clinicId,
      };
    });
    setClinics(reducedClinics);
  };

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
          borderRadius: "2px",
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
              width: "15%",
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
            <div style={{ paddingBottom: "10px" }}></div>
            <LoadingButton
              onClick={fetchClinics}
              loading={loading}
              disabled={!(phone && provider && zipCode)}
              loadingIndicator="Loading..."
              variant="outlined"
            >
              Fetch data
            </LoadingButton>
          </div>
        </div>
      </Box>
      <div style={{ paddingTop: "40px" }}>
        {clinics.length > 0 && (
          <div
            style={{
              paddingBottom: "20px",
              fontSize: 20,
              fontFamily: "Helvetica-Bold",
            }}
          >
            Here are the 25 CVS Clinics closest to you, we'll send you a text
            when one of them has an appointment opening, make sure to go to CVS
            quickly to book your appointment:
          </div>
        )}
        {clinics.map((clinic) => {
          return <div>{clinic.name}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
