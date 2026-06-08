import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from "../../../Components/ContentHeader";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import InputField from "../../../Components/Form/InputField";
import InputTags from "../../../Components/Form/InputTags";
import { phases, serverLink } from "../../../Data/Variables";
import contractInstance from "../../../utils/contractInstance";

const EditPhase = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  // const { currentAccount } = useContext(TransactionProvider);

  useEffect(() => {
    async function getData() {
      let link = serverLink + "/election/" + id;
      let res = await axios.get(link);
      let tmp = res.data;
      setData(tmp);
      console.log(tmp);
      setCandidates(tmp.candidates);
    }
    getData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const currentPhase = e.target.currentPhase.value;
    if (currentPhase === "voting") {
      async function electionBegins() {
        try {
          const { contract } = await contractInstance();
          const organizerConnected = localStorage.getItem('connected address');
          let listSize = localStorage.getItem('listsize');
          console.log(listSize);
          const startElectionTx = await contract.startVoting(
            organizerConnected,
            listSize,
          );
          toast.success(
            'Election is being started...!',
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );
          await startElectionTx.wait();
          const newData = { name, currentPhase };
          console.log(newData);
          const link = serverLink + "phase/edit/" + data._id;

          axios.post(link, newData).then((res) => {
            if (res.status === 201) {
              navigate("/admin/phase");
            }
          });
        } catch (err) {
          console.log('Err at electionBegins()', err);
          toast.error(`${err?.reason}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      electionBegins();
    }
    else if (currentPhase === "result") {
      async function electionEnds() {
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
          const endElectionTx = await contract.endVoting(
            organizerConnected,
            listSize,
          );
          // toast.info(
          //   'We are ending your election. Kindly wait till Confirmation...!',
          //   {
          //     position: toast.POSITION.TOP_CENTER,
          //   },
          // );
          toast.success('The election is ended...!', {
            position: toast.POSITION.TOP_CENTER,
          });
          await endElectionTx.wait();
          // toast.success('Your election is ended...!', {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          const newData = { name, currentPhase };
          console.log(newData);
          const link = serverLink + "phase/edit/" + data._id;

          axios.post(link, newData).then((res) => {
            if (res.status === 201) {
              navigate("/admin/phase");
            }
          });
        } catch (err) {
          console.log('Err at electionEnds()', err);
          toast.error(`${err?.reason} `, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      electionEnds();
    }
  };

  return (
    <div className="admin__content">
      <ContentHeader />
      <ToastContainer />
      {data && (
        <div className="content">
          <form onSubmit={handleSubmit} method="POST">
            <Paper elevation={3}>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Edit Phase
                </Typography>
                <Grid container pt={3} spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="name"
                      name="name"
                      fullWidth={true}
                      value={data.name}
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputTags
                      setCandidates={setCandidates}
                      candidates={candidates}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={phases}
                      defaultValue={data.currentPhase}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          name="currentPhase"
                          label="Phase"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary">
                    Update Phase
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPhase;
