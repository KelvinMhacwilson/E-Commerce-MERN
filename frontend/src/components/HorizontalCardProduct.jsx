/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { fetchProductsForCategories } from "../helpers/fetchProductsForCategories";
import { formatPrice } from "../helpers/formatPrice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/addToCart";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProducts = await fetchProductsForCategories(category);
    setData(categoryProducts?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container px-4 my-4 mx-auto relative">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white ml-3 hidden md:block rounded-full shadow-sm p-1 text-lg absolute left-0"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white hidden md:block mr-3 text-lg rounded-full shadow-sm p-1 absolute right-0 "
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div key={index}>
                  <div className="w-96 overflow-hidden h-36 bg-white rounded shadow flex cursor-pointer">
                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                    <div className="p-4 grid  w-full gap-2">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 animate-pulse bg-slate-200">
                        {product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse"></p>
                      <div className="flex w-full">
                        <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse"></p>
                        <p className="text-slate-500 bg-slate-200 line-through p-1 animate-pulse"></p>
                      </div>
                      <button className=" text-white px-3 rounded-full w-full mt-1 text-sm py-0.5"></button>
                    </div>
                  </div>
                </div>
              );
            })
          : data?.map((product, index) => {
              return (
                <Link to={`/product/${product._id}`} key={index}>
                  <div className="w-96 overflow-hidden h-36 bg-white rounded shadow flex cursor-pointer">
                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] ">
                      <img
                        src={product.productImage[0]}
                        alt={product?.productName}
                        className="object-scale-down h-full hover:scale-110 transition-all"
                      />
                    </div>
                    <div className="p-4 grid ">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                        {product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.category}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-red-600 font-medium">
                          {formatPrice(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {formatPrice(product?.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => addToCart(e, product?._id)}
                        className="bg-red-600 text-white px-3 rounded-full mt-1 text-sm hover:bg-red-700 py-0.5"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
