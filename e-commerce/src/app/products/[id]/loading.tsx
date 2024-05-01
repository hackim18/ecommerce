import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-40 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
        <div>
          <h2 className="text-3xl font-semibold mb-4 bg-gray-200 w-2/3 h-8 animate-pulse"></h2>
          <p className="text-gray-600 mb-4 bg-gray-200 h-5 animate-pulse"></p>
          <p className="text-lg font-semibold mb-4 bg-gray-200 w-1/3 h-8 animate-pulse"></p>
          <div className="mb-4">
            <span className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 bg-gray-200 h-6 w-16 animate-pulse"></span>
          </div>
          <button className="btn btn-outline btn-info bg-gray-200 h-10 w-24 animate-pulse">Add to Cart</button>
        </div>
      </div>
      <div className="md:text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product Gallery</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-full h-64 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
