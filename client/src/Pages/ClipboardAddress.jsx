import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TransactionContext } from "../context/TransactionContext";
import clipboardpic from '../pics/clipboard.png';
import login from '../pics/loginicon1.png';

const ClipboardAddress = () => {
    // const location = useLocation();
    // const data = location?.state?.info;
    const { currentAccount, setCurrentAccount, connectWallet } =
        useContext(TransactionContext);

    // console.log(currentAccount);
    // eslint-disable-next-line no-unused-vars
    // const [election, setElection] = useState({});

    const trimmedCurrentAccount = currentAccount.slice(0, 10);
    const navigate = useNavigate();

    useEffect(() => {
        connectWallet();
    }, [connectWallet]);

    window.ethereum.on('accountsChanged', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setCurrentAccount(await signer.getAddress());
    });

    window.ethereum.on('chainChanged', async () => {
        window.location.reload();
        navigate('/');
    });

    // const fromStorageAccount = localStorage.getItem('connected address');
    // const trimmedStorageAccount =
    //   fromStorageAccount && fromStorageAccount.slice(0, 10);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentAccount);
        toast.success('Address copied to clipboard!', {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    return (
        <>
            <div className="flex justify-between mr-28 text-center shadow-sm shadow-blue-300 rounded-md w-44 h-10 absolute top-8 right-0 ">
                <img
                    src={login}
                    alt="Login pic"
                    className="object-scale-down h-8  m-auto"
                />
                <p className="m-auto">
                    {currentAccount ? trimmedCurrentAccount : ''}....
                </p>
                <img
                    src={clipboardpic}
                    alt="clipboard"
                    className="h-4 m-auto"
                    onClick={copyToClipboard}
                />
                <ToastContainer />
            </div>
        </>
    )
}

export default ClipboardAddress