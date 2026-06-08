import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from "../../../Components/ContentHeader";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import InputField from "../../../Components/Form/InputField";
import { serverLink } from "../../../Data/Variables";
import contractInstance from "../../../utils/contractInstance";

export default function AddCandidate() {
  // const { createEthereumContract } = useContext(TransactionContext);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const today = new Date();
  // const maxDate =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const navigate = useNavigate();
  // const [join, setJoin] = useState(2000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const fullName = e.target.fullName.value;
    const party = e.target.party.value;
    const position = e.target.position.value;
    const age = Number(e.target.age.value);
    const address = e.target.address.value;
    // console.log(join);
    const qualification = e.target.qualification.value;
    const symbol = selectedOption;
    // console.log(symbol);
    const location = e.target.location.value;
    const electionArea = e.target.electionArea.value;
    const description = e.target.description.value;
    const data = {
      username,
      fullName,
      party,
      position,
      age,
      address,
      qualification,
      symbol,
      location,
      electionArea,
      description,
    };

    // console.log(typeof age, data);

    // axios
    //   .post("http://localhost:1322/api/auth/candidate/register", data)
    //   .then((res) => {
    //     console.log(res.status);
    //     if (res.status === 201) {
    async function addCandidate() {
      try {
        const { contract } = await contractInstance();
        const organizerConnected = localStorage.getItem('connected address');

        let listSize = localStorage.getItem('listsize');
        //   username,
        // fullName,
        // party,
        // position,
        // age,
        // address,
        // qualification,
        // symbol,
        // location,
        // electionArea,
        // description,
        if (!username || !fullName || !party || !position || !age || !address || !qualification || !symbol || !location || !electionArea || !description) {
          return toast.error('Kindly fill all details!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        console.log(
          username,
          fullName,
          party,
          position,
          age,
          address,
          qualification,
          symbol,
          location,
          electionArea,
          description,
          // name,
          // age,
          // position,
          // candidateParty,
          // address,
          organizerConnected,
          listSize,
        );
        const addCandidateTx = await contract.setCandidate(
          username,
          fullName,
          party,
          position,
          age,
          address,
          // qualification,
          symbol,
          // location,
          electionArea,
          // description,
          organizerConnected,
          listSize,
        );
        // toast.info(
        //   'We are adding Candidate , Kindly Wait till Confirmation...!',
        //   {
        //     position: toast.POSITION.TOP_CENTER,
        //   },
        // );
        toast.success('Candidate Added Successfully....!', {
          position: toast.POSITION.TOP_CENTER,
        });
        await addCandidateTx.wait();


        // const confirmCan = await addCandidateTx.wait();
        // window.location.reload();
        // setTimeout(() => {
        //   if (confirmCan) {
        //     toast.success('Candidate Added Successfully....!', {
        //       position: toast.POSITION.TOP_CENTER,
        //     });
        //   }
        // }, 5000);
        axios
          .post(`${serverLink}candidate/register`, data)
          .then((res) => {
            console.log(res.status);
            if (res.status === 201) {
              navigate("/admin/candidate");
            }
          });
      } catch (error) {
        toast.error('Candidate already exists in same election....!!', {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log('Err at add Candidate()', error);
      }
    }
    addCandidate();
    // navigate("/admin/candidate");
  }
  // });
  // };

  return (
    <div className="admin__content">
      <ToastContainer />
      <ContentHeader />
      <div className="content">
        <form onSubmit={handleSubmit} method="POST">
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Add Candidate
              </Typography>
              <Grid container pt={3} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="username"
                    name="username"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Full Name"
                    name="fullName"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Party Name" name="party" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Position" name="position" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <DatePicker name="dob" title="Birth Date" max={maxDate} /> */}
                  <InputField
                    type="number"
                    label="Age" name="age" fullWidth={true}
                    variant="outlined"
                  />
                  {/* <InputField label="Age" name="age" fullWidth={true} /> */}
                  <ErrorMessage />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Politics Join From (Year)"
                    fullWidth
                    readOnly
                    inputProps={{ min: 1900, max: 2099 }}
                    value={join}
                    onChange={(e) => {
                      setJoin(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <InputField label="Metamask Account Address" name="address" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-symbol">Select your symbol</InputLabel>
                    <Select
                      labelId="select-symbol"
                      id="select-symbol"
                      value={selectedOption}
                      label="Select your symbol"
                      onChange={handleChange}
                    >
                      <MenuItem value="boat">Boat</MenuItem>
                      <MenuItem value="truck">Truck</MenuItem>
                      <MenuItem value="eagle">Eagle</MenuItem>
                      {/* <MenuItem value="option3">Option 3</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem> */}
                    </Select>
                  </FormControl>
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Qualification"
                    name="qualification"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Location"
                    name="location"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Election Area"
                    name="electionArea"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={5}
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Add Candidate
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
    </div>
  );
}
