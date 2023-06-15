import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../contexts/UserContext';
import '../styles/Cart.css';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Cart = () => {
  const { user } = useContext(UserContext);

  const cartTotalPrice = user.cart.reduce(
    (total, image) => total + parseFloat(image.price),
    0
  );

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <section className="Cart-wrapper home-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header d-flex justify-content-between align-items-center py-3 mb-2">
                <h4 className="cart-col-1">Image</h4>
                <h4 className="cart-col-2">Title</h4>
                <h4 className="cart-col-3">Price</h4>
                <h4 className="cart-col-4">Delete</h4>
              </div>
              {user.cart.map((image) => (
                <div className="cart-item d-flex justify-content-between align-items-center py-3 mb-2">
                  <div className="cart-col-1 d-flex align-items-center">
                    <img
                      src={image.imageSrc}
                      alt={image.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="cart-col-2">
                    <h5 className="title">{image.title}</h5>
                  </div>
                  <div className="cart-col-3">
                    <h5 className="price">${image.price}</h5>
                  </div>
                  <div className="cart-col-4">
                    <AiFillDelete />
                  </div>
                </div>
              ))}
              <div className="col-12 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link className="button " to="/">
                    Continue to Shopping
                  </Link>
                  <div className="d-flex flex-column align-items-end">
                    <h4>{`SubTotal: $${cartTotalPrice}`}</h4>
                    <p>Taxes and shipping cakculated at checkout</p>
                    <Link className="button" to="/checkout">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
