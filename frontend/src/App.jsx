import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendDomain } from "../common";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import "./App.css";

function App() {
  const [cartTotal, setCartTotal] = useState(0);
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

  const fetchCartTotal = async () => {
    await axios
      .get(`${backendDomain}/cart-total`, { withCredentials: true })
      .then((res) => {
        setCartTotal(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartTotal();
  });
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartTotal,
          fetchCartTotal,
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
