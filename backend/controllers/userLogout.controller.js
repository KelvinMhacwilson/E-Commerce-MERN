async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
}

export default userLogout;
