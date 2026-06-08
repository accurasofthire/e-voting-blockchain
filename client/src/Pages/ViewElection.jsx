import { Grid, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandidateLayout from "../Components/User/CandidateLayout";
import { serverLink } from "../Data/Variables";
import ClipboardAddress from "./ClipboardAddress";

const ViewElection = () => {
  const { id } = useParams();

  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let link = serverLink + "election/" + id;
      let res = await axios.get(link);
      let users = res?.data;
      setData(users);
    }
    if (id) getData();
  }, [id]);

  return (
    <>
      <ClipboardAddress />
      <div style={{ paddingBottom: 25 }} className="w-[90%] mx-auto mt-5">
        <Toolbar>
          <Grid container pt={3} spacing={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h3" style={style.pageTitle}>
                Candidates of {data?.name}
              </Typography>
            </Grid>
            {data?.candidates != null &&
              data?.candidates?.map((item, index) => {
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <CandidateLayout
                      username={item}
                      index={index}
                      id={data?._id}
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

export default ViewElection;
