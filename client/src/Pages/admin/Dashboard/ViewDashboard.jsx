import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from "../../../Components/ContentHeader";
import DashboardCard from "../../../Components/DashboardCard";
import { serverLink } from "../../../Data/Variables";
import { TransactionContext } from "../../../context/TransactionContext";

// import { signer } from "../../../context/TransactionContext";
import "../../../style.css";
import contractInstance from "../../../utils/contractInstance.js";

const ViewDashboard = () => {
  const { createEthereumContract, currentAccount, setCurrentAccount } = useContext(TransactionContext);
  // const navigate = useNavigate();
  const [users, setUsers] = useState(0);
  const [candidates, setCandidates] = useState(0);
  const [elections, setElections] = useState(0);

  useEffect(() => {
    async function addOrganizer() {
      try {
        const { contract, signerAddress } = await contractInstance();
        let listSize = 1;
        // listSize = organizersListMumbai.length;
        // if (networkId === 11155111) {
        //   listSize = organizersListSepolia.length;
        // } else {
        //   listSize = organizersListMumbai.length;
        // }
        const addOrgTx = await contract.addOrganizer(signerAddress, listSize);
        localStorage.setItem('listsize', listSize);
        setCurrentAccount(signerAddress);
        localStorage.setItem('connected address', currentAccount);
        if (localStorage.getItem('connected address') !== "") {
          toast.info(
            'You will soon be added as organizer. Kindly Wait till confirmation..!',
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );

          // const confirmOrg = await addOrgTx.wait();
          await addOrgTx.wait();
          // setTimeout(() => {
          //   if (confirmOrg) {
          toast.success(
            'You are added as organizer. Now you can add candidates, users and start elections.',
            {
              position: toast.POSITION.TOP_CENTER,
            },
          );
          // }
          // }, 2000);
          // navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log('Err at addOrganizer()', error);
        toast.error(
          `${error?.reason}`,
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
      }
    }
    async function getUsers() {
      let res = await axios.get(`${serverLink}users`);
      let users = res.data;
      res = null;
      setUsers(users.length);
      res = await axios.get(`${serverLink}candidates`);
      let candidates = res.data;
      setCandidates(candidates.length);
      res = await axios.get(`${serverLink}elections`);
      let elections = res.data;
      setElections(elections.length);
      if (!localStorage.getItem('connected address') || localStorage.getItem('connected address') === "") addOrganizer();
    }
    getUsers();
  }, [createEthereumContract, currentAccount, setCurrentAccount]);

  return (
    <div className="admin__content">
      <ContentHeader />
      <ToastContainer />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        <DashboardCard title="Users" data={users} />
        <DashboardCard title="Candidates" data={candidates} />
        <DashboardCard title="Elections" data={elections} />
      </div>
    </div>
  );
};

export default ViewDashboard;
