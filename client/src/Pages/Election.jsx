import { Grid, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import ElectionLayout from "../Components/User/ElectionLayout";
import { serverLink } from "../Data/Variables";
import { TransactionContext } from "../context/TransactionContext";
import ClipboardAddress from "./ClipboardAddress";

const Election = () => {
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
      let res = await axios.get(serverLink + "voting/elections");
      let users = res?.data;
      setData(users);
    }
    if (data?.length === 0) getData();
  }, [data?.length]);

  return (
    <>
      {data?.length !== 0 ?
        (<div className="content w-[90%] mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ClipboardAddress />
              <div style={{ paddingBottom: 25 }}>
                <Toolbar>
                  <Grid container pt={3} spacing={2}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Typography variant="h3" style={style.pageTitle}>
                        Elections
                      </Typography>
                    </Grid>
                    {data?.map((item, index) => {
                      return (
                        <Grid item xs={6} md={4} key={index}>
                          <ElectionLayout
                            index={index}
                            title={item?.name}
                            candidates={item?.candidates}
                            election={item?._id}
                            info={item}
                            link={item?._id}
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
                <ClipboardAddress />
                <div className="grid place-items-center h-32">
                  <h1 className="text-4xl font-sans mt-40 ml-12 intro">
                    Hello Voter
                  </h1>
                  <p className="text-1xl font-sans mt-2 ml-12 intro">
                    Election is not started yet!
                    Stay tuned for Voting in the upcoming elections...
                  </p>
                  <div className="flex gap-5">
                    <button
                      className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
                      <Link to="/login">
                        Back to Previous
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
        )}
    </>
  )
}

export default Election;
