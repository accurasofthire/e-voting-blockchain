import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from "../../../Components/ContentHeader";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import InputField from "../../../Components/Form/InputField";
import { serverLink } from "../../../Data/Variables";
import contractInstance from "../../../utils/contractInstance";

const AddUser = () => {
  const navigate = useNavigate();
  const [locationData, setLocation] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;
    const location = locationData?.city;
    const votingAddress = e.target.votingAddress.value;
    // const profile = e.target.profile.files[0];
    const sendData = new FormData();
    sendData.append("username", username);
    sendData.append("fname", fname);
    sendData.append("lname", lname);
    sendData.append("email", email);
    sendData.append("mobile", mobile);
    sendData.append("password", password);
    sendData.append("location", location);
    sendData.append("votingAddress", votingAddress);
    // sendData.append("profile", profile);
    // sendData.append("avatar", username + "." + profile.name.split(".").pop());

    const profile = e.target.profile.files;
    for (let i = 0; i < profile.length; i++) {
      sendData.append("profile", profile[i]);
      sendData.append("avatar", username + "-" + (i + 1) + "." + profile[i].name.split(".").pop());
    }

    console.log(sendData);

    async function addVoter() {
      try {
        const { contract } = await contractInstance();
        const organizerConnected = localStorage.getItem('connected address');

        let listSize = localStorage.getItem('listsize');

        // username || fname || lname || email || mobile || password || location || votingAddress || profile

        if (!username || !fname || !lname || !email || !mobile || !password || !location || !votingAddress || !profile) {
          return toast.error('Kindly fill all details!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        console.log(
          username,
          fname,
          lname,
          email,
          mobile,
          // password,
          location,
          // profile,
          votingAddress,
          organizerConnected,
          listSize,
        );
        const addVoterTx = await contract.setVoter(
          username,
          fname,
          lname,
          email,
          mobile,
          // password,
          location,
          // profile,
          votingAddress,
          organizerConnected,
          listSize,
        );

        toast.success('Voter Added Successfully....!', {
          position: toast.POSITION.TOP_CENTER,
        });
        await addVoterTx.wait();
        // const confirmCan = await addVoterTx.wait();
        // console.log(confirmCan);
        // window.location.reload();
        // if (confirmCan) {
        // setTimeout(() => {

        // }, 6000);
        // }
        axios.post(serverLink + "register", sendData).then((res) => {
          console.log(res.status);
          if (res.status === 201) {
            navigate("/admin/user");
          }
        });
      } catch (error) {
        toast.error('Voter already exists....!!', {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log('Err at add Voter()', error);
      }
    }
    addVoter();
  };

  useEffect(() => {
    async function getData() {
      await axios
        .get("https://geolocation-db.com/json/")
        .then((res) => {
          setLocation(res.data);
          // console.log(res.data.city);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader />
      <ToastContainer />
      <div className="content">
        <form onSubmit={handleSubmit} method="POST">
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Add User
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
                  <InputField label="Voter Address" name="votingAddress" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="First Name"
                    name="fname"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Last Name" name="lname" fullWidth={true} />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="email"
                    label="E-mail" name="email" fullWidth={true}
                    variant="outlined"
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="tel"
                    label="Mobile" name="mobile" fullWidth={true}
                    variant="outlined"
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Confirm Password"
                    name="confirmpassword"
                    fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <InputField label="Your Current Location" name="location" fullWidth={true} value={locationData?.country_name} readOnly />
                  <ErrorMessage />
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  <label htmlFor="profile" className="block mb-3">Upload Image</label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    multiple
                    required
                  // fullWidth={true}
                  />
                  <ErrorMessage />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Add User
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
