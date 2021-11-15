import { useEffect, useState } from "react";
import useFirebase from "./useFirebase.js";

const useCart = () => {
  const { user } = useFirebase();
  const { uid, email } = user;
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    fetch(`https://pacific-journey-60016.herokuapp.com/cart/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setSelectedProduct(data);
        }
      });
  }, [uid]);

  function addToCart(product) {
    const isHave = selectedProduct.find(
      (selected) => selected._id === product._id
    );
    delete product._id;
    product.uid = uid;
    product.email = email;
    product.status = "pending";

    if (isHave) {
      alert("Product has been selected!");
    } else {
      fetch("https://pacific-journey-60016.herokuapp.com/product/add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            const newSelection = [...selectedProduct, product];
            setSelectedProduct(newSelection);
          }
        });
    }
  }


  function remove(id) {
    const confirmation = window.confirm('Are you sure to Delete!!!')
    if (confirmation) {
      fetch(`https://dark-fangs-43312.herokuapp.com/delete/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount === 1) {
            const selectAfterRemove = selectedProduct.filter(
              (product) => product._id !== id
            );
            setSelectedProduct(selectAfterRemove);
          }
        });
    }
  }


  return { setSelectedProduct, remove, addToCart, selectedProduct };
};

export default useCart;
