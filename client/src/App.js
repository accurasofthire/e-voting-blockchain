import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";
import { adminRoutes } from "./Routes/AdminRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { TransactionProvider } from "./context/TransactionContext";
const PageNotFound = lazy(() => import("./Pages/admin/PageNotFound"));


function App() {
  return (
    <div className="line-clamp-3">
      <TransactionProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              {userRoutes}
              {adminRoutes}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TransactionProvider>
    </div>
  );
}

export default App;






// import { ethers } from 'ethers';
// import React, { useEffect, useState } from 'react';

// function App() {
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     const initializeProvider = async () => {
//       if (window.ethereum) {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);
//       }
//     };

//     initializeProvider();
//   }, []);

//   return (
//     <div>
//       <h1>Ethers.js and React Integration</h1>
//       {/* Your application code goes here */}
//       {provider ?
//         ("Ami") : ("Tmi")
//       }
//     </div>
//   );
// }

// export default App;
