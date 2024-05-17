import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axios from "axios";
import { backendDomain } from "../../common";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
  // async function lin() {
  //   await axios.get(
  //     "https://camo.githubusercontent.com/151f8901c2198be12c14adc4cd5126b12dee7778adb20e9531a2407952e07560/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d6b656c76696e6d68616377696c736f6e266c6162656c3d50726f66696c65253230766965777326636f6c6f723d306537356236267374796c653d666c6174"
  //   );
  // }

  // setInterval(async () => {
  //   await lin();
  // }, 1000);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    }
  }, [navigate, user]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    await axios.get(`${backendDomain}/all-products`).then((response) => {
      setAllProducts(response.data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border border-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-4 rounded-full"
        >
          Add Product
        </button>
      </div>

      <div className="flex mt-2 items-center gap-3 flex-wrap justify-center h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts.map((product) => {
          return (
            <AdminProductCard
              fetchAllProducts={fetchAllProducts}
              product={product}
              key={product?._id}
            />
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProduct
          fetchAllProducts={fetchAllProducts}
          onClose={() => setOpenUploadProduct(false)}
        />
      )}
    </div>
  );
}

export default AllProducts;
