import { Grid, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";
import CardLayout from "../Components/User/CardLayout";
import { serverLink } from "../Data/Variables";
import { TransactionContext } from "../context/TransactionContext";
import contractInstance from "../utils/contractInstance";
import ClipboardAddress from "./ClipboardAddress";

const ResultElection = () => {
  const style = {
    pageTitle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
  };

  const [data, setData] = useState([]);
  const { isLoading } = useContext(TransactionContext);

  useEffect(() => {
    async function getData() {
      try {
        const { contract } = await contractInstance();
        // const currentOrganizerId = 0;
        // console.log(currentOrganizerId);
        // const endElectionTx = await contract.endVoting(
        //   currentAccount,
        //   currentOrganizerId,
        // );
        const organizerConnected = localStorage.getItem('connected address');
        let listSize = localStorage.getItem('listsize');
        // const { totalCandidates } = await contract.displayCandidateDetails(
        //   organizerConnected,
        //   listSize,
        //   0,
        // );
        let link = serverLink + "/candidates";
        let res = await axios.get(link);
        const candidates = res?.data;
        const length = candidates?.length;
        let candidatesResultsList = [];
        localStorage.setItem('highest', 0);

        for (let index = 0; index < length; index++) {
          let { candidateFullName, candidateParty, candidatePosition, candidateSymbol, candidateElectionArea, candidateAddress, votesReceived } =
            await contract.displayCandidateResults(
              organizerConnected,
              listSize,
              index,
            );

          let winner = localStorage.getItem('highest');
          if (votesReceived.toNumber() >= winner) {
            localStorage.setItem('highest', votesReceived.toNumber());
          }
          console.log(candidateFullName, candidateParty, candidatePosition, candidateSymbol, candidateElectionArea, candidateAddress, votesReceived);
          candidatesResultsList.push({
            candidateFullName: candidateFullName,
            candidateParty: candidateParty,
            candidatePosition: candidatePosition,
            candidateSymbol: candidateSymbol,
            candidateElectionArea: candidateElectionArea,
            candidateAddress: candidateAddress,
            votesReceived: votesReceived.toNumber(),
          });
        }
        setData(candidatesResultsList);
      } catch (err) {
        console.log(err?.reason);
        toast.error(`${err?.reason}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      // const transactions = await getAllTransactions();
      // const ans = await getResult(transactions);
      // setResult(ans);
    }
    getData();
  }, [data?.length]);

  return (
    <>
      {data.length !== 0 ?
        (<div className="content w-[89%] ml-10">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ToastContainer />
              <ClipboardAddress />
              <div style={{ paddingBottom: 25 }}>
                <Toolbar>
                  <Grid container pt={3} spacing={2}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Typography variant="h3" style={style.pageTitle}>
                        Election Result
                      </Typography>
                    </Grid>
                    {data?.map((item, index) => {
                      return (
                        <Grid item xs={6} md={4} key={index}>
                          <CardLayout
                            index={index}
                            // title={item?.name}
                            // candidates={item?.candidates}
                            info={item}
                            link={item?.candidateAddress}
                            isWinner={
                              (Number(localStorage.getItem('highest')) === Number(item.votesReceived)) ? 'Y' : 'N'
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Toolbar>
              </div>
            </>
          )}
        </div>)
        : (
          <div className="content w-[89%] ml-10 h-[65vh]">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <ToastContainer />
                <ClipboardAddress />
                <div className="grid place-items-center h-32">
                  <h1 className="text-4xl font-sans mt-40 ml-12 intro">
                    Hello Voter
                  </h1>
                  <p className="text-1xl font-sans mt-2 ml-12 intro">
                    Result is not published yet!
                    Stay tuned for the upcoming results...
                  </p>
                  <div className="flex gap-5">
                    <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/">
                        Back to Home
                      </Link>
                    </button>
                    <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/election">
                        View Election
                      </Link>
                    </button>
                    {/* <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/result">
                        View Result
                      </Link>
                    </button> */}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
};

export default ResultElection;
