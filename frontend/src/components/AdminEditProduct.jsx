/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { backendDomain } from "../../common";
import { toast } from "react-hot-toast";

function AdminEditProduct({ onClose, productData, fetchAllProducts }) {
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage,
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.productImage.length === 0) {
      return toast.error("Upload at least one image");
    }
    console.log(e);
    try {
      await axios
        .post(`${backendDomain}/update-product`, data, {
          withCredentials: true,
        })
        .then(() => {
          fetchAllProducts();
          onClose();
          toast.success("Product updated successfully");
        });
    } catch (error) {
      toast.error(error.response.data || "Something Went Wrong");
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200  bg-opacity-90">
      <div className="bg-white p-4 overflow-hidden rounded w-full max-w-2xl h-full max-h-[80%] pb-8">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <button
            className="bg-gray-200 rounded-full hover:text-red-500 cursor-pointer text-2xl p-1 hover:bg-slate-100"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-1 overflow-y-auto h-full "
        >
          <label htmlFor="productName">Product Name</label>
          <input
            required
            min={2}
            minLength={2}
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="bg-slate-100 p-2 border rounded outline-slate-400"
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name
          </label>
          <input
            required
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="bg-slate-100 p-2 border rounded outline-slate-400"
          />

          <label htmlFor="category" className="mt-3">
            Category
          </label>
          <select
            required
            defaultValue={productData?.category}
            className="bg-slate-100 p-2 border rounded outline-slate-400"
            onChange={handleOnChange}
            id="category"
          >
            <option value="">Choose a Category</option>
            {productCategory.map((category, index) => {
              return (
                <option key={category.value + index} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Upload Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 cursor-pointer flex justify-center items-center border  rounded h-32 w-full">
              <div className="text-slate-500  flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.productImage[0] ? (
              <div className="flex gap-2 items-center flex-wrap justify-center">
                {data.productImage.map((image, index) => (
                  <div className="relative group" key={index}>
                    <img
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(image);
                      }}
                      src={image}
                      alt={`image${index}`}
                      width={80}
                      height={80}
                      className="bg-slate-100 h-[80px] w-[80px] object-contain border cursor-pointer"
                    />

                    <div
                      onClick={() => handleDeleteProductImage(index)}
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer hover:bg-red-700 transition-all"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-xs">Upload Image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price
          </label>
          <input
            required
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChange}
            className="bg-slate-100 p-2 border rounded outline-slate-400"
          />
          <label htmlFor="description">Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="bg-slate-100 p-2 border rounded outline-slate-400"
          />
          <label htmlFor="description" className="mt-3">
            Description
          </label>
          <textarea
            required
            type="text"
            id="description"
            placeholder="Enter Description"
            value={data.description}
            onChange={handleOnChange}
            className="bg-slate-100 p-2 min-h-40 max-h-60 border rounded outline-slate-400"
          />

          <button className="px-2 hover:bg-red-700 transition-all bg-red-600 py-2 text-white mb-5 mt-4 ">
            Edit Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )}
    </div>
  );
}

export default AdminEditProduct;
