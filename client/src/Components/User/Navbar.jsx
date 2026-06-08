import React from "react";
// import { Toolbar, Typography, AppBar, Grid } from "@mui/material";
// import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import { Link } from "react-router-dom";
// import { NavbarData } from "../../Data/NavbarData";
import logo from "../../pics/logoVoting.png";


// react.school/material-ui

export default function ButtonAppBar() {
  // const style = {
  //   logo: {
  //     fontSize: 35,
  //     paddingRight: 10,
  //   },
  //   navLink: {
  //     fontSize: 20,
  //     color: "white",
  //   },
  // };

  return (
    <>
      {/* <AppBar>
        <Toolbar classname="line-clamp-3">
          <Grid container spacing={0}>
            <Grid item xs={6} display="flex">
              <HowToVoteOutlinedIcon style={style.logo} />
              <Typography variant="h5">Voting System</Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container gap={6} justifyContent="flex-end">
                {NavbarData.map((item, index) => {
                  return (
                    <Link to={item.link} key={index}>
                      <Typography style={style.navLink}>
                        {item.title}
                      </Typography>
                    </Link>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar /> */}

      <div className="flex mt-6 ml-6   ">
        <img
          src={logo}
          alt="logo pic"
          className=" ml-10 object-scale-down h-12 w-28 "
        />
        <Link to="/">
          <h1 className=" mt-2 text-4xl font-mono title text-gray-800">
            E-Voting
          </h1>
        </Link>
        {/* {NavbarData.map((item, index) => {
          return (
            <Link to={item.link} key={index}>
              {item.title}
            </Link>
          );
        })} */}
      </div>
    </>
  );
}
