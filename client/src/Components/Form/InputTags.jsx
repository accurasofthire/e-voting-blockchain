/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { serverLink } from "../../Data/Variables";

export default function InputTags(props) {
  const MenuProps = {};
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const users = await axios.get(serverLink + "candidates");
        let cand = users.data;
        setData(cand);
        let k = cand.filter((tmp) =>
          props.candidates.includes(tmp.username) ? tmp : null
        );
        setValue(k);
      } catch (e) {
        console.log("Server Error : " + e);
      }
    }
    getData();
  }, [props.candidates]);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    props.setCandidates(value);
    setValue(value);
    console.log(props.candidates);
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Candidates</InputLabel>
        <Select
          readOnly={props.readOnly}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.candidates ?? personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Select Candidates"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem
              key={name._id}
              value={name.username}
              style={getStyles(name.username, personName, theme)}
            >
              {name.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
