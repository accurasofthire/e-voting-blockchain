import * as React from "react";
import { Link } from "react-router-dom";
import Features from "./Features";
import HomePic from "./HomePic";
import Intro from "./Intro";

// const theme = createTheme();

export default function Home() {
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <main>
    //     <Box
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         minHeight: "calc(100vh - 128px)",
    //       }}
    //     >
    //       <img
    //         style={{ width: "50vw" }}
    //         src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/10/16044143/M187_Digital-voting-header.png"
    //         alt="random"
    //       />
    //     </Box>
    //   </main>
    // </ThemeProvider>
    <>
      <div className="mb-5">
        <Intro />
        <HomePic />
        {/* <div className="flex gap-5 ml-28 mt-8">
          <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login as Organizer</button>
          <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login as Voter</button>
        </div> */}
        <div className="flex gap-5 ml-20">
          <button
            className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
            <Link to="/admin">
              Login as Organizer
            </Link>
          </button>
          <button
            className={`rounded-none bg-blue-300 h-16 w-60 text-2xl mt-10 ml-18 text-center shadow-md shadow-blue-400 font-serif hover:bg-blue-200 `}>
            <Link to="/login">
              Login as Voter
            </Link>
          </button>

          {/* <Button
            content="Login as Organizer"
            path="/admin"
            color="blue"
            admin={true}
          />
          <Button
            content="Login as Voter"
            path="/login"
            color="blue"
            forElectionList={true}
            voterlogin={true}
          /> */}
        </div>
        <Features />
      </div>
    </>
  );
}
