function AllProducts() {
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button className="border border-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-4 rounded-full">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
