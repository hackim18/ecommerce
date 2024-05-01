"use client";

import { useState, useEffect } from "react";
import { Product } from "../type";
import { fetchProducts } from "../action";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "@/components/Search";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const limit = 3;

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const searchedProducts = await fetchProducts(searchQuery, nextPage, limit);
      if (searchedProducts.length > 0) {
        setProducts([...products, ...searchedProducts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchQuery, 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    handleSearch(searchQuery, 1);
  }, [searchQuery]);

  const handleSearch = async (query: string, pageNumber: number) => {
    try {
      const searchedProducts = await fetchProducts(query, pageNumber, limit);
      setProducts(searchedProducts);
      setPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const trimText = (text: string) => {
    if (text.length > 150) {
      return text.slice(0, 150) + "...";
    }
    return text;
  };

  return (
    <>
      <Search handleChange={handleChange} handleSubmit={handleSubmit} searchQuery={searchQuery} />
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={products.length % limit === 0}
        loader={
          <div className="flex justify-center items-center mt-8 my-4">
            <span className="loading loading-bars loading-md"></span>
            <p className="ml-4 text-gray-700">Loading...</p>
          </div>
        }
        endMessage={
          <div className="flex justify-center items-center mt-8 my-4">
            <p>No more products</p>
          </div>
        }
      >
        <div className="grid grid-cols-3 justify-center gap-4 mt-4">
          {products.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}
