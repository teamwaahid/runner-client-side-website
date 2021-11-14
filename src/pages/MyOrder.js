import React from "react";
import Cart from "./Cart.js";
import AdminPanel from "./AdminPanel";
// import useAuth from "../hooks/useAuth.js";
import useFirebase from "../hooks/useFirebase.js";
import Review from "../components/Review/Review";

const MyOrder = () => {
  const { admin } = useFirebase();

  return (
    <div>
      {!admin ? (
        <>
          <Cart></Cart>
          <Review></Review>
        </>
      ) : (
        <>
          <AdminPanel></AdminPanel>
        </>
      )}
      {/* <Cart></Cart>
      {admin &&
        <>
          <AdminPanel></AdminPanel>
        </>
      }
 */}


    </div>
  );
};

export default MyOrder;
