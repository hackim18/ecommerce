"use client";

import React from "react";

export default function ProductDetailError() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-red-600">Error</h1>
          <p className="text-lg text-gray-600">Failed to load product details. Please try again later.</p>
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      </div>
    </div>
  );
}
