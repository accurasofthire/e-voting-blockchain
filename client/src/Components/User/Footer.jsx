import React from "react";
import { Link } from "react-router-dom";
import logo from "../../pics/logoVoting.png";

const Footer = () => (
  <>
    {/* <AppBar position="static" component="footer" color="default">
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="caption">Copyright ©{new Date().getFullYear()}, All rights reserved to Mehedi Khan Rakib and Sakib Shahon</Typography>
        </Toolbar>
      </AppBar> */}

    <div className="bg-blue-300  h-40 2xl:h-44 w-full flex text-center mt-12 2xl:mt-32 ">
      <div className="mx-auto">
        <div className=" mr-28 ">
          {/* <LogoandTitle /> */}

          <div className="flex mt-6 ml-6   ">
            <img
              src={logo}
              alt="logo pic"
              className=" ml-10 object-scale-down h-12 w-28 "
            />
            <Link to="/">
              <h1 className=" mt-2 text-4xl font-mono title text-gray-800">
                E-Voting
              </h1>
            </Link>
          </div>        </div>
        <p className="py-4 ">© {new Date().getFullYear()}, E-Voting All rights reserved to Mehedi Khan Rakib and Sakib Shahon</p>
      </div>
    </div>
  </>
);

export default Footer;
