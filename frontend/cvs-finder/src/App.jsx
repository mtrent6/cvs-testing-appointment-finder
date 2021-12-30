import "./App.css";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
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
  const [carrier, setCarrier] = useState();
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

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
    await postToServer(reducedClinics);
  };

  const postToServer = async (clinics) => {
    const json = {
      phone: phone,
      carrier: carrier,
      clinics: clinics.map((clinic) => clinic.id),
    };
    const response = await axios.post(
      "http://afitz.hopto.org:8000/addUser",
      json
    );
    console.log(response);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleCarrierChange = (event) => {
    setCarrier(event.target.value);
  };

  const webLayout = () => {
    return (
      <div style={{ height: "100vh" }}>
        <div
          className="header-gradient"
          style={{
            width: "100%",
            height: "4vh",
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
        Hi Friends! Please enter in your zip code and phone number and we'll let
        you know when a COVID appointment is available at your nearest CVS! :)
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
                error={!zipCode || zipCode?.length !== 5}
                onChange={handleZipCodeChange}
              />
              <TextField
                id="standard-basic"
                label="Phone Number"
                value={phone}
                error={!phone || phone?.length !== 10}
                onChange={handlePhoneChange}
                variant="standard"
              />
              <div style={{ paddingBottom: "20px" }}></div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Phone Carrier
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={carrier}
                  error={!carrier}
                  label="Phone Carrier"
                  onChange={handleCarrierChange}
                >
                  <MenuItem value={"Verizon"}>
                    <div style={{ textAlign: "left" }}>Verizon</div>
                  </MenuItem>
                  <MenuItem value={"ATT"}>
                    <div style={{ textAlign: "left" }}>AT&T</div>
                  </MenuItem>
                  <MenuItem value={"T-Mobile"}>
                    <div style={{ textAlign: "left" }}>T-Mobile</div>
                  </MenuItem>
                </Select>
              </FormControl>
              <div style={{ paddingBottom: "10px" }}></div>
              <LoadingButton
                onClick={fetchClinics}
                loading={loading}
                disabled={!(phone && carrier && zipCode)}
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
              when one of them has an appointment opening, make sure to go to
              CVS quickly to book your appointment:
            </div>
          )}
          {clinics.map((clinic) => {
            return <div style={{ padding: 7 }}>{clinic.name}</div>;
          })}
        </div>
      </div>
    );
  };

  const mobileLayout = () => {
    return (
      <div style={{ height: "100vh" }}>
        <div
          className="header-gradient"
          style={{
            width: "100%",
            height: "4vh",
            fontSize: 20,
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
        <div style={{ fontSize: "16px", padding: 10 }}>
          Hi Friends! Please enter in your zip code and phone number and we'll
          let you know when a COVID appointment is available at your nearest CVS
          :)
        </div>
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
                width: "60%",
                height: "100%",
              }}
            >
              <TextField
                id="standard-basic"
                label="Zip Code"
                variant="standard"
                error={!zipCode || zipCode?.length !== 5}
                value={zipCode}
                onChange={handleZipCodeChange}
              />
              <TextField
                id="standard-basic"
                label="Phone Number"
                value={phone}
                error={!phone || phone?.length !== 10}
                onChange={handlePhoneChange}
                variant="standard"
              />
              <div style={{ paddingBottom: "20px" }}></div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Phone Carrier
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={carrier}
                  error={!carrier}
                  label="Phone Carrier"
                  onChange={handleCarrierChange}
                >
                  <MenuItem value={"Verizon"}>
                    <div style={{ textAlign: "left" }}>Verizon</div>
                  </MenuItem>
                  <MenuItem value={"ATT"}>
                    <div style={{ textAlign: "left" }}>AT&T</div>
                  </MenuItem>
                  <MenuItem value={"T-Mobile"}>
                    <div style={{ textAlign: "left" }}>T-Mobile</div>
                  </MenuItem>
                </Select>
              </FormControl>
              <div style={{ paddingBottom: "10px" }}></div>
              <LoadingButton
                onClick={fetchClinics}
                loading={loading}
                disabled={!(phone && carrier && zipCode)}
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
                padding: 10,
                paddingBottom: 20,
                fontSize: 16,
                fontFamily: "Helvetica-Bold",
              }}
            >
              Here are the 25 CVS Clinics closest to you, we'll send you a text
              when one of them has an appointment opening, make sure to go to
              CVS quickly to book your appointment:
            </div>
          )}
          {clinics.map((clinic) => {
            return (
              <div style={{ padding: 7, fontSize: 15 }}>{clinic.name}</div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {!isMobile && webLayout()}
      {isMobile && mobileLayout()}
    </div>
  );
};

export default App;
