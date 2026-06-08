import { Card, CardContent, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
// import Candidate from "../../../Components/Admin/Candidate";
import ContentHeader from "../../../Components/ContentHeader";

const ViewElectionResult = () => {
  const location = useLocation();
  const data = location?.state?.info;
  // console.log(data);

  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  return (
    <div className="admin__content">
      <ContentHeader />
      <div style={{ paddingBottom: 25 }}>
        <Toolbar>
          <Grid container pt={3} spacing={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h3" style={style.pageTitle}>
                Result of {data?.candidateFullName}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                {/* <CardMedia
                  height="140"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "285px",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Avatar
                    aria-label="recipe"
                    sx={{
                      width: "200px",
                      height: "200px",
                      fontSize: "50px",
                      bgcolor: stringToColor(data?.candidateFullName),
                    }}
                  >
                    {stringToAv(data?.candidateFullName)}
                  </Avatar>
                </CardMedia> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Symbol: {data?.candidateSymbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div">
                    <Typography>
                      Name : {data?.candidateFullName}
                    </Typography>
                    <Typography>
                      Party : {data?.candidateParty}
                    </Typography>
                    <Typography>
                      Position : {data?.candidatePosition}
                    </Typography>
                    <Typography>Total Vote : {data?.votesReceived}</Typography>
                    <Typography>Election Area: {data?.candidateElectionArea}</Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Toolbar>
      </div>
    </div>
  );
};

export default ViewElectionResult;
