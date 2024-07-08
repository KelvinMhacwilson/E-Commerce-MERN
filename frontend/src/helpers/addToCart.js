import axios from "axios";
import { backendDomain } from "../../common/index";
import toast from "react-hot-toast";

export const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  await axios
    .post(
      `${backendDomain}/add-to-cart`,
      { productId: id },
      { withCredentials: true }
    )
    .then((res) => {
      // console.log(res.data);
      toast.success(res.data.message);
      return res.data;
    })
    .catch((err) => {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    });
};
