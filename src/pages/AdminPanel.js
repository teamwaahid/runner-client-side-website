import React, { useState } from "react";
import AddProduct from "../components/Admin/AddProduct";
import MakeAdmin from "../components/Admin/MakeAdmin";
import Order from "../components/Admin/Order";
import Overview from "../components/Admin/Overview";
import Products from "../components/Admin/Products";
// import useAuth from "../hooks/useAuth";

const AdminPanel = () => {
  const [active, setActive] = useState('Overview');
  // const [admin] = useAuth();
  return (
    <div className='container-fluid'>
      <div className='row my-3'>
        <div className='col-3'>
          <ul className='list-unstyled'>
            <li className='w-100 mb-2'><input
              onClick={() => setActive('Overview')}
              className={active === 'Overview' ? 'w-100 btn btn-primary d-block' : 'w-100 d-block btn btn-secondary'}
              type='button'
              value='Overview' /></li>
            <li className='w-100 mb-2'><input
              onClick={() => setActive('Manage Orders')}
              className={active === 'Manage Orders' ? 'w-100 btn btn-primary d-block' : 'w-100 d-block btn btn-secondary'}
              type='button'
              value='Manage Orders' /></li>
            <li className='w-100 mb-2'><input
              onClick={() => setActive('Manage Products')}
              className={active === 'Manage Products' ? 'w-100 btn btn-primary d-block' : 'w-100 d-block btn btn-secondary'}
              type='button'
              value='Manage Products' /></li>
            <li className='w-100 mb-2'><input Products
              onClick={() => setActive('Add A Product')} className={active === 'Add A Product' ? 'w-100 btn btn-primary d-block' : 'w-100 d-block btn btn-secondary'}
              type='button'
              value='Add A Product' /></li>
            <li className='w-100 mb-2'><input Products
              onClick={() => setActive('Make a Admin')} className={active === 'Make a Admin' ? 'w-100 btn btn-primary d-block' : 'w-100 d-block btn btn-secondary'}
              type='button'
              value='Make a Admin' /></li>
          </ul>
        </div>
        <div className='col-9'>
          {
            (active === 'Overview' && <Overview></Overview>) ||
            (active === 'Manage Orders' && <Order></Order>) ||
            (active === 'Manage Products' && <Products></Products>) ||
            (active === 'Add A Product' && <AddProduct></AddProduct>) ||
            (active === 'Make a Admin' && <MakeAdmin></MakeAdmin>)
          }
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
