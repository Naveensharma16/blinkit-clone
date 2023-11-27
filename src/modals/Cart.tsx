import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../features/Cart/cartSlice.tsx";

import { RootState } from "../app/Store.tsx";

type closeCart = {
  closeCartSidebar: () => void;
};

type cartTypeProp = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export default function Cart({ closeCartSidebar }: closeCart) {
  const { cart, total } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  // function to increment the product count
  const incrementProductCount = (id: string, qty: number): void => {
    dispatch(incrementQuantity({ id, qty }));
  };
  // function to decrement the product count
  const decrementProductCount = (id: string, qty: number): void => {
    dispatch(decrementQuantity({ id, qty }));
  };

  // function to clear cart and set total to 0 when user click on purchase items
  const handlePurchaseItems = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <div className="background-overlay"> </div>
      <div className="cart-box">
        <div className="sidebar-header">
          <p>My Cart</p>
          <span onClick={closeCartSidebar} aria-hidden="true">
            x
          </span>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="cart-product-list">
              {cart.map((item: cartTypeProp) => {
                return (
                  <div className="single-product" key={item.id}>
                    <div className="product-img">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="product-details">
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                    <div className="product-count">
                      <div className="counter">
                        <div
                          className="minus"
                          onClick={() =>
                            decrementProductCount(item.id, item.quantity)
                          }
                          aria-hidden="true"
                        >
                          -
                        </div>
                        <div className="count">{item.quantity}</div>
                        <div
                          className="plus"
                          onClick={() =>
                            incrementProductCount(item.id, item.quantity)
                          }
                          aria-hidden="true"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="total-to-pay"
              onClick={handlePurchaseItems}
              aria-hidden="true"
            >
              <div className="amount-due">
                <p>₹ {total}</p>
                <span>TOTAL</span>
              </div>
              <div className="purchase">
                <p>Purchase</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* no product in cart container */}
            <div className="no-product-found">
              <img
                src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png"
                alt=""
              />
              <h4>{`You don't have any items in your cart`}</h4>
              <p>Your favourite items are just a click away</p>
              <button type="button" onClick={closeCartSidebar}>
                Start shopping
              </button>
            </div>
            {/* no product in cart container */}
          </>
        )}
      </div>
    </div>
  );
}
