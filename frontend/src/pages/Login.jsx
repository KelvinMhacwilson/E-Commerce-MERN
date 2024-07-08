import { FaEye, FaEyeSlash } from "react-icons/fa6";
import LoginIcon from "../assets/signin.gif";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendDomain } from "../../common";
import { toast } from "react-hot-toast";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchCartTotal } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${backendDomain}/login`, data, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Logged in");
        fetchUserDetails();
        navigate("/");
        fetchCartTotal();
      })
      .catch((err) => {
        toast.error(err.response.data || "Something went wrong");
      });
  };

  return (
    <section id="login">
      <div className="mx-auto p-4 container">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 flex mx-auto ">
            <img src={LoginIcon} alt="Login Icon" className="rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label htmlFor="email">Email{": "} </label>
              <div className="bg-slate-100  ">
                <input
                  name="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent p-2"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="email">Password{": "} </label>
              <div className="bg-slate-100 flex justify-center items-center pr-2">
                <input
                  name="password"
                  required
                  onChange={handleChange}
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none p-2  bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="block ml-auto hover:underline w-fit hover:text-red-600 mt-4"
              >
                Forgot Password?
              </Link>
            </div>

            <button className="bg-red-600 text-white  w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>

          <p className="my-5">
            Don{"'"}t have an account?{" "}
            <Link
              to="/sign-up"
              className="hover:text-red-700 transition-all text-red-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
