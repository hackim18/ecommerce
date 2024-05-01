import React from "react";

export default function ProductLoading() {
  return (
    <div className="grid grid-cols-3 justify-center gap-4 mt-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="max-w-md justify-self-center animate-pulse">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <div className="w-full h-80 bg-gray-200 rounded-xl"></div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title bg-gray-200 w-2/3 h-8 mb-4"></h2>
              <p className="bg-gray-200 h-6 w-full mb-4"></p>
              <div className="card-actions flex justify-between">
                <div className="btn btn-outline btn-success bg-gray-200 h-8 w-20"></div>
                <div className="btn btn-outline btn-info bg-gray-200 h-8 w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
