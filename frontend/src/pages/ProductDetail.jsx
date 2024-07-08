import { useParams } from "react-router-dom";
import axios from "axios";
import { backendDomain } from "../../common";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { formatPrice } from "../helpers/formatPrice";
// import VerticalCardProducts from "../components/VerticalCardProducts";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import { addToCart } from "../helpers/addToCart";

function ProductDetail() {
  const params = useParams();
  const { fetchCartTotal } = useContext(Context);

  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchCartTotal();
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    z: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const productImageListLoading = new Array(4).fill(null);

  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get(`${backendDomain}/product-details/${params.id}`)
      .then((res) => {
        setData(res?.data);
        setActiveImage(res?.data.productImage[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleMouseEnterProduct = (image) => {
    setActiveImage(image);
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] bg-slate-200 w-[300px] lg:h-96 lg:w-96 relative p-2">
            <img
              onMouseMove={handleZoomImage}
              onMouseLeave={() => setZoomImage(false)}
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
            />

            {/* Zoom Product */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 overflow-hidden p-1 -right-[510px] top-0">
                <div
                  className="w-full min-h-[400px] min-w-[500px] h-full  mix-blend-multiply scale-150"
                  style={{
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${activeImage})`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2  lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-200 animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2  lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((image) => {
                  return (
                    <div key={image} className="h-20 w-20 bg-slate-200 ">
                      <img
                        onMouseEnter={() => handleMouseEnterProduct(image)}
                        onClick={() => handleMouseEnterProduct(image)}
                        src={image}
                        alt=""
                        className="w-full cursor-pointer transition-all h-full object-scale-down mix-blend-multiply p-1"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        {loading ? (
          <div className="grid w-full gap-2 ">
            <p className="  bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded "></p>
            <h2 className="  bg-slate-200 lg:h-8 animate-pulse h-6 w-full rounded "></h2>
            <p className=" rounded bg-slate-200 animate-pulse h-6 w-full  " />
            <div className=" rounded lg:h-8 bg-slate-200 animate-pulse h-6 w-full " />

            <div className="  bg-slate-200 lg:h-8 rounded animate-pulse h-6 w-full  " />

            <div className=" lg:h-8 bg-slate-200 rounded animate-pulse h-10 w-full" />

            <div className="flex bg-slate-200 animate-pulse flex-1 rounded w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="bg-red-200 text-center  w-fit pb-1 text-red-600 px-2 rounded-full">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data.productName}
            </h2>
            <p className="capitalize text-slate-400">{data.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-xl font-medium ">
              <p className="text-red-600">{formatPrice(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through">
                {formatPrice(data.price)}
              </p>
            </div>

            <div className="flex items-center gap-2 my-1">
              <button className="px-3 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all  py-1 border-2 border-red-600 rounded">
                Buy{" "}
              </button>
              <button
                className="px-3 min-w-[120px]  font-medium hover:text-red-600 hover:bg-white transition-all text-white  py-1 border-2 bg-red-600 border-red-600 rounded"
                onClick={(e) => {
                  handleAddToCart(e, data?._id);
                }}
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className="">{data.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading="Recommended Products "
        />
      )}
    </div>
  );
}

export default ProductDetail;
