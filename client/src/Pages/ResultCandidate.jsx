import { Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Candidate from "../Components/Admin/Candidate";
import ClipboardAddress from "./ClipboardAddress";

const ResultCandidate = () => {
  const location = useLocation();
  const data = location?.state?.info;

  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  return (
    <>
      <ClipboardAddress />
      <div style={{ paddingBottom: 25 }} className="w-[90%] mx-auto">
        <Toolbar>
          <Grid container pt={3} spacing={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h3" style={style.pageTitle}>
                Result of {data.name}
              </Typography>
            </Grid>
            {data.candidates != null &&
              data.candidates.map((item, index) => {
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <Candidate
                      username={item}
                      index={index}
                      id={data._id}
                      vote={data.vote[index]}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Toolbar>
      </div>
    </>
  );
};

export default ResultCandidate;
