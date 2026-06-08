import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage } from "../Components/Form/ErrorMessage";
import InputField from "../Components/Form/InputField";
import Loading from "../Components/Loading";
import { isFaceRecognitionEnable, serverLink } from "../Data/Variables";
import { TransactionContext } from "../context/TransactionContext";
import contractInstance from "../utils/contractInstance";

const ElectionsList = () => {
    const location = useLocation();
    const data = location.state?.info;
    // const navigate = useNavigate();
    // console.log(data);
    const [election, setElection] = useState({});
    const { isLoading } =
        useContext(TransactionContext);

    useEffect(() => {
        // connectWallet();

        async function getData() {
            console.log(data);
            let link = serverLink + "election/" + data.election_id;
            let res = await axios.get(link);
            let election = res?.data;
            setElection(election);
        }
        if (data?.election_id) getData();
    }, [data]);

    // const checkDuplicateVote = async (user_id) => {
    //     let found = false;
    //     try {
    //         let transactions = await getAllTransactions();
    //         let electionGroup = ObjectGroupBy(transactions, "election_id");
    //         let candidate = ObjectGroupBy(electionGroup[election._id], "user_id");
    //         // let found = false;
    //         if (candidate[user_id]?.length > 0) {
    //             // alert("You already Voted");
    //             toast.error('You have already Voted!', {
    //                 position: toast.POSITION.TOP_CENTER,
    //             });
    //             // window.location.href = "/";
    //             found = true;
    //         }
    //         return found;
    //     } catch (err) {
    //         console.log(err);
    //         return found;
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const username = e.target.username.value;
        const tmp = {
            username,
            password,
        };
        // axios.post(serverLink + "votingEmail", { id: data.user_id });

        let check = await axios.post(serverLink + "login", tmp);
        console.log(check);
        if (check.status === 202) {
            // alert(check.data);
            toast.error(`${check.data}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        } else if (check.status === 201) {
            // await connectWallet();
            // let trans = false;
            // const dupVote = await checkDuplicateVote(check.data?._id);
            // const dupBool = Boolean(dupVote);
            // // console.log(dupBool);
            // // checkDuplicateVote(check.data._id);
            // if (!dupBool) {
            //     trans = await sendTransaction(
            //         data.election_id,
            //         data.candidate_id,
            //         check.data._id
            //     );
            //     console.log(trans);

            //     if (trans.valid) {
            //         toast.success('Thank You For the Vote!', {
            //             position: toast.POSITION.TOP_CENTER,
            //         });
            //         axios.post(serverLink + "votingEmail", { id: check.data._id });
            //         toast.success('A mail is sent to your email address!', {
            //             position: toast.POSITION.TOP_CENTER,
            //         });
            //         // alert("Thank You For the Vote");
            //         // window.location.href = "/";
            //     } else {
            //         // alert(trans.mess);
            //         toast.error(`${trans.mess}`, {
            //             position: toast.POSITION.TOP_CENTER,
            //         });
            //     }
            // }

            async function addVote() {
                try {
                    const { contract } = await contractInstance();
                    console.log(contract);
                    const organizerConnected = localStorage.getItem('connected address');
                    let listSize = localStorage.getItem('listsize');

                    // console.log(data?.candidate_address, organizerConnected, data?.user_votingAddress
                    //     , listSize);

                    const voteToTx = await contract.voteTo(
                        data?.candidate_address, organizerConnected, data?.user_votingAddress
                        , listSize
                    );
                    //   toast.info(
                    //     'Your vote is being added. Kindly wait till Confirmation...!',
                    //     {
                    //       position: toast.POSITION.TOP_CENTER,
                    //     },
                    //   );
                    const vote = await voteToTx.wait();
                    // console.log(vote);
                    if (vote) {
                        toast.success('Thank You For the Vote!', {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        setTimeout(() => {
                            axios.post(serverLink + "votingEmail", { id: check.data._id });
                            toast.info('A mail is sent to your email address!', {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        }, 5000);
                    }
                }
                catch (err) {
                    // console.log('ERROR at addVote()', err);
                    toast.error(`${err.reason.slice(err.reason.indexOf(':') + 1)}`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
            addVote();
            // navigate("/");
        }
    };
    return (
        <>
            {Object.keys(election).length !== 0 || data ?
                (<>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <button
                                className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 mb-5 grid place-items-center mx-auto`}>
                                <Link to="/">
                                    Back to Home
                                </Link>
                            </button>
                            <div className="content w-[50%] grid place-items-center mx-auto mt-10">
                                <ToastContainer />
                                <form onSubmit={handleSubmit} method="POST">
                                    <Paper elevation={3}>
                                        <Box px={3} py={2}>
                                            <Typography variant="h6" align="center" margin="dense">
                                                Enter Credentials
                                            </Typography>
                                            <Grid container pt={3} spacing={3}>
                                                <Grid item xs={12} sm={12}>
                                                    <InputField
                                                        label="username"
                                                        name="username"
                                                        fullWidth={true}
                                                        value={data?.user_username}
                                                        id="outlined-disabled one"
                                                        disabled={isFaceRecognitionEnable}
                                                    />
                                                    <ErrorMessage />
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <InputField
                                                        label="Election Id"
                                                        name="election_id"
                                                        fullWidth={true}
                                                        type="password"
                                                        value={data?.election_id}
                                                        id="outlined-disabled two"
                                                        disabled
                                                    />
                                                    <ErrorMessage />
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <InputField
                                                        label="Candidate Name"
                                                        name="candidate_name"
                                                        fullWidth={true}
                                                        value={data?.candidate_username}
                                                        id="outlined-disabled three"
                                                        disabled
                                                    />
                                                    <ErrorMessage />
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <InputField
                                                        label="Password"
                                                        name="password"
                                                        fullWidth={true}
                                                        type="password"
                                                        id="password"
                                                    />
                                                    <ErrorMessage />
                                                </Grid>
                                            </Grid>
                                            <Box mt={3}>
                                                <Button type="submit" variant="contained" color="primary">
                                                    Vote
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </form>
                            </div>
                        </>
                    )}
                </>
                )
                : (
                    <div className="content w-[89%] ml-10 h-[65vh]">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="grid place-items-center h-32">
                                <h1 className="text-4xl font-sans mt-40 ml-12 intro">
                                    Hello Voter
                                </h1>
                                <p className="text-1xl font-sans mt-2 ml-12 intro">
                                    {/* Election is not started yet!
                                    Stay tuned for Voting in the upcoming elections that are to be published... */}
                                    Press the following buttons to see current state of the election and result.
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
                        )}
                    </div>
                )}
        </>
    )
}

export default ElectionsList