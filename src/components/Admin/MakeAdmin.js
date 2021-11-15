import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');

    const handleEmailSubmit = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://pacific-journey-60016.herokuapp.com/makeadmin', {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    alert('Made Admin Successfully')
                }
            })

        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleAdminSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onBlur={handleEmailSubmit} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <button type="submit" class="btn btn-primary">Make Admin</button>
            </form>
        </div>
    );
};

export default MakeAdmin;