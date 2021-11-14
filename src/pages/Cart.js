import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Rating from "react-rating";
import useAuth from "../hooks/useAuth.js";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { NavLink, useHistory } from "react-router-dom";

const Cart = () => {
  const { selectedProduct, remove, setSelectedProduct, AllContexts } = useAuth();
  const { user } = AllContexts;
  const { uid, displayName, photoURL, email } = user;

  const history = useHistory();
  const totalPrice = selectedProduct.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className="my-4">
      <Container>
        {selectedProduct.length ? (
          <Row>
            <Col className="text-center" md={4}>

              {/* Profile Section */}
              <h1 className="text-center">Profile</h1>
              <Container className="my-2">
                <Row>
                  <Col>
                    <div className="align-items-center d-flex flex-column">
                      <img
                        width="120px"
                        className="rounded-circle"
                        src={photoURL}
                        alt=""
                      />
                      <h6>Full name</h6>
                      <h4>{displayName}</h4>
                      <h6>Email Address</h6>
                      <h4>{email}</h4>
                      <button className="btn mt-3 btn-primary">Edit Profile</button>
                    </div>
                  </Col>
                </Row>
              </Container>

              {/* Purchase Section */}
              <h4>Total {selectedProduct.length} product selected</h4>
              <h6>Total Price: {totalPrice} $</h6>
              <NavLink
                to="/payment"
                className="rounded btn btn-primary fs-5 py-2 px-4"
              >
                Make Payment
              </NavLink><br /><br />
              <button
                onClick={() => {
                  fetch(
                    `https://dark-fangs-43312.herokuapp.com/purchase/${uid}`,
                    {
                      method: "delete",
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.deletedCount > 0) {
                        alert("This for purchasing");
                        setSelectedProduct([]);
                        history.push("/home");
                      }
                    });
                }}
                className="btn btn-primary"
              >
                Check Out
              </button>
            </Col>

            {/* Product Cart Section */}
            <Col className="" md={8}>
              {selectedProduct.map((product) => {
                const { img, _id, title, description, rating, price } =
                  product;

                return (
                  <Row className="my-3 border border-primary p-3" key={_id}>
                    <Col sm={5}>
                      <img className="img-fluid" src={img} alt="" />
                    </Col>
                    <Col sm={7}>
                      <h5>{title?.slice(0, 80)}</h5>
                      <p className="mb-0">{description.slice(0, 150)}</p>
                      <h4>Price: {price}$</h4>
                      <Row>
                        <Col sm={4}>
                          <Col>
                            <Rating
                              initialRating={rating}
                              readonly
                              emptySymbol={
                                <FontAwesomeIcon
                                  className="text-warning"
                                  icon={emptyStar}
                                />
                              }
                              fullSymbol={
                                <FontAwesomeIcon
                                  className="text-warning"
                                  icon={fullStar}
                                />
                              }
                            />
                            <span>{rating}</span>
                          </Col>

                        </Col>
                        <Col sm={8}>
                          <div className="d-flex">
                            <button
                              onClick={() => remove(_id)}
                              className="btn btn-primary  w-100"
                            >
                              Remove
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        ) : (
          <div className="text-center my-5 py-5">
            <h1>No Product Selected!</h1>
          </div>
        )}
      </Container>
    </div >
  );
};

export default Cart;
