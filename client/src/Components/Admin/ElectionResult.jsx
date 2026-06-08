import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import resultpic from '../../pics/result.png';

export default function CardLayout(props) {
  const { info, isWinner } = props;
  // console.log(info);
  // const image = "https://picsum.photos/200/300?random=" + props.index;
  // const link = "" + props.link;

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      /> */}
      <CardContent>
        {/* {isWinner === 'Y' && (
          <img src={resultpic} alt="resultpic" className="h-16 mt-2" />
        )}
        <Typography gutterBottom variant="h5" component="div">
          {info?.candidatePosition}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {info?.candidateSymbol}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {info?.candidateFullName}
        </Typography> */}

        <CardContent>
          {isWinner === 'Y' && (
            <img src={resultpic} alt="resultpic" className="h-16 mt-2" />
          )}
          <Typography gutterBottom variant="h5" component="div">
            Symbol: {info?.candidateSymbol}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <Typography>
              Name : {info?.candidateFullName}
            </Typography>
            <Typography>
              Party : {info?.candidateParty}
            </Typography>
            <Typography>
              Position : {info?.candidatePosition}
            </Typography>
            <Typography>Total Vote : {info?.votesReceived}</Typography>
            <Typography>Election Area: {info?.candidateElectionArea}</Typography>
          </Typography>
        </CardContent>
      </CardContent>
      {/* <CardActions>
        <Link to={link} state={{ info: info }}>
          <Button size="small">View Details</Button>
        </Link>
      </CardActions> */}
    </Card>
  );
}
