import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 9;
  useEffect(() => {
    fetch(
      `http://localhost:5000/products?size=${size}&&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const totalData = data.count;
        const pages = Math.ceil(totalData / size);
        setTotalPage(pages);
      });
  }, [currentPage]);
  return { products, setProducts, totalPage, currentPage, setCurrentPage };
};

export default useProducts;
