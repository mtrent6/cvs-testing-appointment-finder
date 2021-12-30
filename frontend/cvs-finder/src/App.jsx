import logo from "./logo.svg";
import "./App.css";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { clinicIDs } from "./config";

export const App = () => {
  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{display: 'flex', flexDirection: 'column', width: '20%', height: '100%'}}>
          <TextField id="standard-basic" label="Standard" variant="standard" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
          <TextField id="standard-basic" label="Standard" variant="standard" />

        </div>
      </Box>{" "}
    </div>
  );
};

export default App;
