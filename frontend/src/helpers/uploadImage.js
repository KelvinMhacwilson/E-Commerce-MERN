import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/dq6p7y4en/image/upload`;
const uploadImage = async (image) => {
  const formData = new FormData();
  // console.log(image);
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  return axios
    .post(url, formData)
    .then((data) => {
      return data.data.url;
    })
    .catch((error) => console.log(error));
};

export default uploadImage;
