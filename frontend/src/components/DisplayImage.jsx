/* eslint-disable react/prop-types */

import { IoMdClose } from "react-icons/io";

/* eslint-disable no-unused-vars */
const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl m-auto p-4">
        <button
          className="bg-gray-200 block rounded-full hover:text-red-500 cursor-pointer text-2xl p-1 ml-auto  hover:bg-slate-100"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <div className="flex justify-center p-4 max-h[80vh] max-w-[80vh]">
          <img
            src={imageUrl}
            alt="Expanded Product"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
