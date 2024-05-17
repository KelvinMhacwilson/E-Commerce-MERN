import axios from "axios";
import { backendDomain } from "../../common";

export const fetchProductsForCategories = async (category) => {
  // console.log(category);
  return axios
    .post(`${backendDomain}/category-product`, { category: category })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};
