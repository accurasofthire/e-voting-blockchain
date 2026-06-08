import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";


// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="http://localhost:3000">
//         Voting System
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function AdminLogin() {
  const { setCurrentAccount, connectWallet } =
    useContext(TransactionContext);
  // const [signerAccount, setSignerAccount] = useState("");

  // console.log(currentAccount);
  // eslint-disable-next-line no-unused-vars
  // const [election, setElection] = useState({});

  // const trimmedCurrentAccount = currentAccount.slice(0, 10);
  const navigate = useNavigate();



  useEffect(() => {
    connectWallet();
    // const addressMatcher = async () => {
    //   const { signerAddress } = await contractInstance();
    //   // setIsLoading(true);
    //   // console.log(signerAddress);
    //   setSignerAccount(signerAddress);
    // }
    // addressMatcher();
    // const signerAddress = getSignerAddress();

    // setConnectedAccount(signerAddress);
    // console.log(currentAccount);
    // async function displayOrganizers() {
    //   try {
    //     const { signerAddress, contract } = await contractInstance();
    //     setIsLoading(true);
    //     // console.log(signerAddress);
    //     setSignerAccount(signerAddress);
    //     console.log(contract);
    //     // if (signerAccount === currentAccount) return true;
    //   } catch (error) {
    //     console.log('Err at displayOrganizers()', error);
    //     // return false;
    //   }
    // }
    // displayOrganizers();
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

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(currentAccount);
  //   toast.success('Address copied to clipboard!', {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let password = data.get("password");
    let email = data.get("email");
    if (password === "admin123" && email === "mkrakib007@gmail.com") {
      navigate("/admin/dashboard");
    } else {
      console.log("Failed");
    }
  };

  return (
    <>
      {/* signerAccount.toLowerCase() !== currentAccount.toLowerCase()
 */}
      {/* {loading ?
        (<div className="flex justify-between mr-28 text-center shadow-sm shadow-blue-300 rounded-md w-44 h-10 absolute top-8 right-0 ">
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
        </div>) :
        ( */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <button
            className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200`}>
            <NavLink to="/">
              Back to Home
            </NavLink>
          </button>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }} className="shadow-xl mb-5 p-5"
          >

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>

      {/* )} */}
    </>
  );
}
