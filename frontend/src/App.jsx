import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { backendDomain } from "../common";
import Context from "./context/index";

function App() {
  const fetchUserDetails = async () => {
    await axios
      .get(`${backendDomain}/user-details`, {
        withCredentials: true,
      })
      .then(() => {
        // console.log(data);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <Header />
        <main className="min-h-[calc(100vh-100px)]">
          <Outlet />
        </main>

        <Footer />
        <Toaster />
      </Context.Provider>
    </>
  );
}

export default App;
