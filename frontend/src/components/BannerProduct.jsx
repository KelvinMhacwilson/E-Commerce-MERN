import { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image1M from "../assets/banner/img1_mobile.jpg";
import image2 from "../assets/banner/img2.webp";
import image2M from "../assets/banner/img2_mobile.webp";
import image3 from "../assets/banner/img3.jpg";
import image3M from "../assets/banner/img3_mobile.jpg";
import image4M from "../assets/banner/img4_mobile.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";
import image5M from "../assets/banner/img5_mobile.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1M, image2M, image3M, image4M, image5M];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => {
        return prev + 1;
      });
    }
  };
  const previousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => {
        return prev - 1;
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 ">
      <div className="md:h-72 h-56 bg-slate-200 w-full relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-2xl ">
            <button
              onClick={previousImage}
              className="bg-white rounded-full shadow-sm p-1 "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white rounded-full shadow-sm p-1 "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="md:flex h-full w-full hidden overflow-hidden">
          {desktopImages.map((image, index) => {
            return (
              <div
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={index}
                className="w-full h-full min-w-full min-h-full transition-all"
              >
                <img src={image} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => {
            return (
              <div
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={index}
                className="w-full h-full min-w-full min-h-full transition-all"
              >
                <img src={image} alt="" className="w-full h-full object-fill" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
