import React from "react";
import { Col, Container, Row, CardGroup, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Product from "../components/product/Product.js";
import Spinner from 'react-bootstrap/Spinner';
import Review from "./Review.js";

const Home = () => {
  const { products } = useAuth();

  return (
    <div>
      {/* Banner Section */}
      <div
        style={{
          background: `url(https://i.ibb.co/5R78Vxk/slide-2.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <Container>
          <div
            style={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="text-center my-5 py-5">
              <h1 className="text-white">Discover The World</h1>
              <p className="my-4 text-white fs-5">
                A world of exceptional destinations for you
              </p>
              <NavLink
                to="/products"
                className="rounded-pill btn btn-primary fs-5 py-2 px-4"
              >
                View Products
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
      {/* Make Difference section */}
      < div className="py-5 my-5" >
        <Container>
          <Row>
            <Col sm={12} md={5} lg={4} className='d-flex justify-content-center align-items-center'>
              <div>
                <h4>MAKE A DIFFERENCE.</h4>
                <p>No one will be surprised to hear that running is good for you. In fact, any regular physical activity will benefit your health.</p>
              </div>
            </Col>
            <Col sm={12} md={7} lg={4} className='text-center' >
              <img src='https://i.ibb.co/FBFd2P5/section-2.jpg' alt='' style={{ height: 480, width: 700 }} />
            </Col>
          </Row>
        </Container>
      </div >

      {/* Product Section */}
      < div id="feature" >
        <div className="text-center text-dark">
          <h1>Enjoy Your Next Trip</h1>
          <p className="mb-0">
            We think you'd enjoy these products for a quick trip.
          </p>
        </div>
        <Container>
          {products.length === 0 ? <h6 className="text-center"><Spinner animation="border" /></h6> :
            <div className="my-3 d-flex flex-wrap justify-content-between">
              <Row>
                {products.slice(0, 6)?.map((product) => (
                  <Product key={product.key} product={product} />
                ))}
              </Row>
            </div>
          }
        </Container>
      </div >

      {/* Brand Section */}
      <div>
        <h2 className='py-5 text-center'>Our Top Brands</h2>
        <CardGroup className='g-4'>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/6scHSLt/brand-1.png" />
          </Card>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/dKz5W26/brand-2.png" />
          </Card>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/CBkpVwL/brand-3.png" />
          </Card>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/PgQkcz0/brand-4.png" />
          </Card>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/cFstMvS/brand-5.png" />
          </Card>
        </CardGroup>
      </div>

      {/* Review Section */}
      <div>
        <h3 className="text-center text-dark py-5">Our Customers Reviews</h3>
        <Container>
          <div className="my-3 d-flex flex-wrap justify-content-between">
            <Row>
              <Review></Review>
            </Row>
          </div>
        </Container>
      </div>
    </div >
  );
};

export default Home;
