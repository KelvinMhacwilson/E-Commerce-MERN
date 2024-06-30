import { useEffect, useState } from "react";
import axios from "axios";
import { backendDomain } from "../../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    await axios
      .get(`${backendDomain}/get-products-category`)
      .then((response) => {
        setCategoryProduct(response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div>
        {loading ? (
          <div className="flex items-center gap-4 overflow-x-scroll justify-between scrollbar-none ">
            {categoryLoading.map((category, i) => {
              return (
                <div
                  key={i}
                  className="md:w-20 w-16 h-16  md:h-20 rounded-full overflow-hidden p-5 px-8 bg-slate-200 flex items-center justify-center animate-pulse "
                ></div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-4 overflow-x-scroll justify-between scrollbar-none">
            {categoryProduct.map((product) => {
              return (
                <Link
                  to={"/product-category/" + product?.category}
                  key={product._id}
                  className="cursor-pointer"
                >
                  <div className="md:w-20 w-16 h-16  md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full w-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>

                  <p className="text-sm md:text-base text-center capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
