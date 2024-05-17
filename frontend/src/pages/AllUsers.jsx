import axios from "axios";
import { backendDomain } from "../../common";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    }
  }, [navigate, user]);
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
  });
  const onClose = () => {
    setOpenUpdateRole(false);
  };
  const getAllUsers = async () => {
    await axios
      .get(`${backendDomain}/all-users`, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setAllUsers(data);
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead className="bg-black text-white">
          <tr>
            <th>SR</th>
            <th>Name </th>
            <th>Email </th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1} </td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>{user.role} </td>
                <td>{moment(user.createdAt).format("ll")} </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateUserDetails({ ...user, userId: user._id });
                      setOpenUpdateRole(true);
                    }}
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={onClose}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails.userId}
          reloadUsers={getAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
