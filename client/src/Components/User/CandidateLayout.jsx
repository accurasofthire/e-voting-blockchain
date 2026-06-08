import { Backdrop, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { isFaceRecognitionEnable, serverLink } from "../../Data/Variables";
import { TransactionContext } from "../../context/TransactionContext";


const CandidateLayout = (props) => {
  const { currentAccount } =
    useContext(TransactionContext);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
  // const { isLoading } = useContext(TransactionContext);

  const link = "/login";

  const [loading, setLoading] = useState(false);

  const handleClick = async (id) => {
    setLoading(true);
    if (isFaceRecognitionEnable) {
      setMsg(" Accessing Camera");
      try {
        // console.log(currentAccount);
        const voterAddress = await axios.get(serverLink + "users");
        let userAddress = voterAddress?.data;
        let userUsername;
        for (let i = 0; i < userAddress?.length; i++) {
          if ((userAddress[i]?.votingAddress).toLowerCase() === (currentAccount).toLowerCase()) {
            userUsername = userAddress[i]?.username;
            let res = await axios.post(serverLink + "op/" + userUsername);
            // let userName = res?.data?.split("-")[0];
            let userName = res?.data[0]?.split("-")[0];
            // console.log(userName);

            setMsg(userName + " Detected");

            res = await axios.get(serverLink + "user/username/" + userName);
            let user = res?.data[0];
            if (!user) {
              // alert("User with " + userName + "username Not Found");
              toast.error(`User with ${userName} username Not Found`, {
                position: toast.POSITION.TOP_CENTER,
              });
              setLoading(false);
              return;
            }
            const tmp = {
              candidate_id: data?._id,
              candidate_username: props?.username,
              candidate_address: data?.address,
              election_id: props?.id,
              user_id: user?._id,
              user_username: user?.username,
              user_votingAddress: user?.votingAddress,
            };

            setMsg("");
            setLoading(false);

            navigate(link, { state: { info: tmp } });
            console.log(res);
            return;
          }
          else {
            toast.error(`Your metamask account address must be valid as a voter`, {
              position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);
            return;
          }
        }
        // let options;
        // if (userUsername) {
        //   // options = {
        //   //   args: [`${userUsername}`]
        //   // }
        //   // console.log(options.args);
        //   var res = await axios.post(serverLink + "op/" + userUsername);
        //   console.log(res);
        //   // console.log(userUsername);
        // }
        // else {
        //   toast.error(`Please provide your metamask account address`, {
        //     position: toast.POSITION.TOP_CENTER,
        //   });
        // }
      } catch (err) {
        // alert(err.response.data);
        toast.error(`${err?.response?.data}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        return;
      }

    } else {
      const sendingData = {
        candidate_id: data?._id,
        candidate_username: props?.username,
        candidate_address: data?.address,
        election_id: props?.id,
      };
      navigate(link, { state: { info: sendingData } });
    }
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "candidate/" + props?.username);
      let user = res?.data;
      setData(user);
    }
    if (!data) getData();
  }, [data, props?.username]);

  return (
    <>
      {/* {data ?
        (<div className="content w-[90%] mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <> */}
      <ToastContainer />
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <div>
            <CircularProgress color="inherit" />
          </div>
          <div>{msg}</div>
        </Backdrop>

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
                bgcolor: stringToColor(data?.fullName),
              }}
            >
              {data !== "" && stringToAv(data?.fullName)}
            </Avatar>
          </CardMedia> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {data !== null && (
                <>
                  <Typography>
                    <strong>Symbol:</strong> {data?.symbol}
                  </Typography>
                  <Typography><strong>Name:</strong> {data?.fullName}</Typography>
                  <Typography><strong>Position:</strong> {data?.position}</Typography>
                  <Typography><strong>Party:</strong> {data?.party}</Typography>
                  <Typography><strong>Election Area:</strong> {data?.electionArea}</Typography>
                  <Typography><strong>Location:</strong> {data?.location}</Typography>
                </>
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleClick(data?._id)}>
              Vote
            </Button>
          </CardActions>
        </Card>
      </div>
      {/* </>
          )}
        </div>)
        : (
          <div className="content w-[89%] ml-10 h-[65vh]">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <ClipboardAddress />
                <div className="grid place-items-center h-32">
                  <h1 className="text-4xl font-sans mt-40 ml-12 intro">
                    Hello Voter
                  </h1>
                  <p className="text-1xl font-sans mt-2 ml-12 intro">
                    Candidate result is not added yet!
                    Stay tuned for Voting in the upcoming candidates result that are to be published...
                  </p>
                  <div className="flex gap-5">
                    <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/election">
                        View Election
                      </Link>
                    </button>
                    <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/result">
                        View Result
                      </Link>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )} */}
    </>
  );
};

export default CandidateLayout;
