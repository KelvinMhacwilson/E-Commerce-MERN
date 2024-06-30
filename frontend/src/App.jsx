import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { backendDomain } from "../common";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    await axios
      .get(`${backendDomain}/user-details`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.data;

        dispatch(setUserDetails(data));
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
        <main className="min-h-[calc(100vh-120px)] ">
          <Outlet />
        </main>

        <Footer />
        <Toaster />
      </Context.Provider>
    </>
  );
}

export default App;
