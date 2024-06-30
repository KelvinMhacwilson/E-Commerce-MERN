/* eslint-disable react/prop-types */
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import { useState } from "react";
import { formatPrice } from "../helpers/formatPrice";

function AdminProductCard({ product, fetchAllProducts }) {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white  p-4 rounded">
      <div className="w-40 flex flex-col justify-center items-center ">
        <div className="w-[120px] h-[120px] flex justify-center items-center">
          <img
            src={product?.productImage[0]}
            alt={product?.productName}
            width={120}
            height={120}
            className="object-contain w-[120px] h-[120px] mb-2"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2 ">{product?.productName}</h1>
        <div className="flex px-2 w-full items-center justify-between">
          <p className="font-semibold">{formatPrice(product?.sellingPrice)}</p>
          <div
            onClick={() => setEditProduct(true)}
            className="w-fit ml-auto p-2 bg-green-200 rounded-full group-hover:block mt-1 cursor-pointer hover:bg-green-400 hover:text-white"
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          fetchAllProducts={fetchAllProducts}
          productData={product}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
