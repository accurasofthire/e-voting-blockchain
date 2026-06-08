import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Loading from "../../../Components/Loading";
import { serverLink } from "../../../Data/Variables";
import { TransactionContext } from "../../../context/TransactionContext";

const ViewPhase = () => {
  const [data, setData] = useState("");
  const { isLoading } = useContext(TransactionContext);

  const columns = [
    { field: "_id", headerName: "Id", width: 220, hide: true },
    { field: "name", headerName: "Name", width: 300 },
    { field: "candidates", headerName: "Candidates", width: 380 },
    { field: "currentPhase", headerName: "Phase", width: 220 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        const link = "edit/" + params.row._id;
        return (
          <Link to={link}>
            <Button>
              <EditIcon />
            </Button>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    async function getData() {
      let link = serverLink + "/elections";
      let res = await axios.get(link);
      let tmp = res.data;
      console.log(tmp);
      setData(tmp);
    }
    getData();
  }, []);

  return (
    <>
      {data ?
        (<>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="admin__content">
              <ContentHeader />
              <div className="content" style={{ paddingBottom: "20px" }}>
                <Card variant="outlined">
                  <BasicTable columns={columns} checkboxSelection rows={data} />
                </Card>
              </div>
            </div>
          )}
        </>
        )
        : (
          <div className="content w-[90%] ml-10 h-[65vh]">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <ContentHeader />

                <div className="grid place-items-center h-32">
                  <h1 className="text-4xl font-sans mt-40 ml-12 intro">
                    Dear Organizer
                  </h1>
                  <p className="text-1xl font-sans mt-2 ml-12 intro">
                    {/* Election is not started yet!
                      Stay tuned for Voting in the upcoming elections that are to be published... */}
                    Election is not started yet!
                    After starting the election, you will see this phase section.
                  </p>
                  {/* <div className="flex gap-5">
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
  </div> */}
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
};

export default ViewPhase;
