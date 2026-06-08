import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { stringToAv, stringToColor } from "../../Data/Methods";

const Candidate = ({ candidateData }) => {
  const { candidateFullName, candidateParty, candidatePosition, candidateSymbol, candidateElectionArea, votesReceived } = candidateData;
  // console.log(candidateFullName, candidateParty, candidatePosition, candidateSymbol, candidateElectionArea, candidateAddress, votesReceived);
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   async function getData() {
  //     let res = await axios.get(serverLink + "candidate/" + candidateAddress);
  //     let user = res?.data;
  //     setData(user);
  //   }
  //   if (data) getData();
  // }, [candidateAddress, data]);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
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
              bgcolor: stringToColor(candidateFullName),
            }}
          >
            {stringToAv(candidateFullName)}
          </Avatar>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {candidateSymbol}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <>
              <Typography>
                Name : {candidateFullName}
              </Typography>
              <Typography>
                Party : {candidateParty}
              </Typography>
              <Typography>
                Position : {candidatePosition}
              </Typography>
              <Typography>Total Vote : {votesReceived}</Typography>
              <Typography>Election Area: {candidateElectionArea}</Typography>
            </>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={() => handleClick(data._id)}>
            Vote
          </Button> */}
        </CardActions>
      </Card>
    </>
  );
};

export default Candidate;
