import User from "../models/user.model.js";

const userPermission = async (userId) => {
  const user = await User.findById(userId);

  if (!user || user.role !== "ADMIN") {
    return false;
  }
  return true;
};

export default userPermission;
