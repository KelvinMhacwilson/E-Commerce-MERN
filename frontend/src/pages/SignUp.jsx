import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SignUpIcon from "../assets/signin.gif";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import axios from "axios";
import { backendDomain } from "../../common";

import { toast } from "react-hot-toast";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

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
    await axios
      .post(`${backendDomain}/signup`, data)
      .then(() => {
        toast.success("Account Created Successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Something went wrong");
      });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id="signUp">
      <div className="mx-auto p-4 container">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20  mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || SignUpIcon} alt="SignUp Icon" />
            </div>
            <form>
              <label>
                <div className="absolute bottom-0 w-full text-xs bg-slate-200 bg-opacity-80  pb-4 pt-2 cursor-pointer text-center">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label htmlFor="name">Name{": "} </label>
              <div className="bg-slate-100  ">
                <input
                  required
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter you Name"
                  className="w-full h-full outline-none bg-transparent p-2"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="email">Email{": "} </label>
              <div className="bg-slate-100  ">
                <input
                  required
                  name="email"
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
            </div>

            <div className="grid">
              <label htmlFor="email">Confirm Password{": "} </label>
              <div className="bg-slate-100 flex justify-center items-center pr-2">
                <input
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  value={data.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none p-2  bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white  w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:text-red-700 transition-all text-red-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
