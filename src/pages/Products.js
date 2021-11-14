import { Container, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth.js";
import Slide from "react-reveal/Slide";
import Product from "../components/product/Product.js";
import Spinner from 'react-bootstrap/Spinner';

const Products = () => {
  const { products, totalPage, currentPage, setCurrentPage } = useAuth();

  function pageHandler(number) {
    setCurrentPage(number);
  }

  return (
    <div className="py-5">
      <div className="text-center text-dark">
        <h1> Products</h1>
        <p className="mb-0">
          Here you can find all your products.
        </p>
      </div>

      <Container>
        {products.length === 0 ? <h6 className="text-center"><Spinner animation="border" /></h6> :
          <div className="my-3 d-flex flex-wrap justify-content-between ">
            <Row>
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </Row>
          </div>
        }
        <div className="d-flex justify-content-center">
          {[...Array(totalPage).keys()].map((number) => (
            <button
              onClick={() => pageHandler(number)}
              key={number}
              className={
                number === currentPage
                  ? "btn btn-primary rounded-0 border"
                  : "btn bg-dark text-white rounded-0 border"
              }
            >
              {number + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;
