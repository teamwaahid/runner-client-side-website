import React, { useRef } from 'react';

const Review = () => {
    const descRef = useRef();
    const ratingRef = useRef();

    async function addReview(e) {
        const desc = descRef.current.value;
        const rating = ratingRef.current.value;
        const user = { description: desc, rating: rating }

        const response = await fetch('http://localhost:5000/review', {
            method: 'post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        });
        const data = await response.json()

        descRef.current.value = '';
        e.preventDefault();
    }

    return (
        <div className='text-center'>
            <h1>Reviews</h1>
            <form onSubmit={addReview}>
                <input ref={descRef} type="text" placeholder='Description'></input>
                <input ref={ratingRef} type="text" placeholder='Rating'></input>
                <input type="submit" value='Add'></input>
            </form>
        </div>
    );
};

export default Review;