import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-sm bg-white">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div className="">
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm">
          <input
            type="text"
            className="w-full rounded-l-full h-8 outline-none pl-2"
            placeholder="Search product here..."
          />
          <div className="text-lg min-w-[50px] flex items-center justify-center rounded-r-full cursor-pointer text-white bg-red-600 h-8">
            <GrSearch />
          </div>
        </div>

        <div className="flex gap-7 items-center">
          <div className="text-3xl cursor-pointer ">
            <FaRegCircleUser />
          </div>
          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 absolute text-sm rounded-full w-5 p-1 text-white flex items-center justify-center h-5 -top-2 -right-3">
              <p>0</p>
            </div>
          </div>
          <Link to="/login">
            <button className="px-3 bg-red-600 py-1 rounded-full text-white hover:bg-red-700">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
