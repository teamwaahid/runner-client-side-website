import React, { useEffect, useState } from 'react';
import useAuth from "./../hooks/useAuth.js";
import { Col, Container, Row } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const { AllContexts } = useAuth();
    const { user } = AllContexts;
    const { displayName, photoURL, email } = user;

    useEffect(() => {
        fetch('https://pacific-journey-60016.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data[0])
            })
    }, []);
    return (
        <div>
            < div className="my-4">
                <Container>
                    <Row className="d-flex justify-content-center ">
                        <Col md={6}>
                            {/* User Detail's */}
                            <Container className="my-2">
                                <Row>
                                    <Col>
                                        <div className="align-items-center d-flex flex-column">
                                            <img
                                                width="220px"
                                                className="rounded-circle"
                                                src={photoURL}
                                                alt=""
                                            />
                                            <h6 className='mt-3'>Full name</h6>
                                            <h4>{displayName}</h4>
                                            <h6>Email Address</h6>
                                            <h4>{email}</h4>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col md={6} className="d-flex align-items-start flex-column ">
                            <p>{reviews.description}</p>
                            <Row>
                                <Col>
                                    <div className="my-2">
                                        <Rating
                                            initialRating={reviews.rating}
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
                                        <span> {reviews.rating}</span><br />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Review;