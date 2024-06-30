/* eslint-disable react/prop-types */
import { useState } from "react";
import ROLE from "../../common/role";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { backendDomain } from "../../common";
import { toast } from "react-hot-toast";

function ChangeUserRole({ name, email, role, onClose, userId, reloadUsers }) {
  axios.defaults.withCredentials = true;
  const [userRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    axios
      .post(
        `${backendDomain}/update-user`,
        { role: userRole, userId },
        { withCredentials: true }
      )
      .then(() => {
        onClose();
        reloadUsers();
        toast.success("updated");
      })
      .catch((err) =>
        toast.error(err.response.message || "Something went wrong")
      );
  };
  return (
    <div className=" w-full h-full z-10 flex justify-center items-center fixed  top-0 bottom-0 right-0 left-0 bg-slate-200 bg-opacity-95">
      <div className="w-full max-w-sm mx-auto bg-white   shadow-md p-4">
        <button
          className="block ml-auto bg-gray-200 rounded-full p-1 hover:bg-slate-100"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((role) => {
              return (
                <option value={role} key={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block p-2 rounded-full px-3 bg-red-600 text-white hover:bg-red-700"
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
