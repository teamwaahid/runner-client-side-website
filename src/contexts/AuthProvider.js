import { createContext } from "react";
import useCart from "../hooks/useCart.js";
import useFirebase from "../hooks/useFirebase.js";
import useProducts from "../hooks/useProducts.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // hooks
  const AllContexts = useFirebase();
  const { products, totalPage, currentPage, setCurrentPage } = useProducts();
  const { addToCart, selectedProduct, remove, setSelectedProduct } = useCart();

  const data = {
    currentPage,
    setCurrentPage,
    AllContexts,
    totalPage,
    products,
    addToCart,
    selectedProduct,
    remove,
    setSelectedProduct,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
