import { useNavigate } from "react-router-dom";
import "./component.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
} from "../features/Cart/cartSlice.tsx";

type singleProduct = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export default function SingleProductCard({
  id,
  name,
  quantity,
  price,
  image,
}: singleProduct) {
  const [inCart, setInCart] = useState(null);

  // hook to navigate to particular product
  const navigate = useNavigate();

  // hook to dispatch data to cart store
  const dispatch = useDispatch();

  // hook to get cart data
  const { cart: cartitems } = useSelector((state) => state.cart);

  useEffect(() => {
    const foundItem = cartitems.find((item) => item.id === id);

    if (foundItem !== undefined) {
      setInCart(foundItem);
    } else {
      setInCart(null);
    }
  }, [cartitems, id]);

  // function to navigate to single product page
  const handleNavigate = (productid: string): void => {
    navigate(`/product/${productid}`);
  };

  // function to add item in cart
  const addItemToCart = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const itemforcart = {
      id,
      name,
      quantity: 1,
      price,
      img: image,
      get total() {
        return this.quantity * this.price;
      },
    };
    // sending all data we have in props regarding to products
    dispatch(addItem(itemforcart));
  };

  // function to increment the product count
  const incrementProductCount = (event, id: string, qty: number): void => {
    event.stopPropagation();
    dispatch(incrementQuantity({ id, qty }));
  };
  // function to decrement the product count
  const decrementProductCount = (event, id: string, qty: number): void => {
    event.stopPropagation();
    dispatch(decrementQuantity({ id, qty }));
  };

  return (
    <div
      className="single-product-card"
      onClick={() => handleNavigate(id)}
      aria-hidden="true"
    >
      <div className="product-image">
        <img src={image} alt="" />
      </div>

      <div className="product-delivery-time">
        <img
          src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png"
          alt=""
        />
        28 Mins
      </div>
      <h6 className="product-name">{name}</h6>
      <p className="product-weight">{quantity}</p>
      <div className="product-meta">
        <p>₹{price}</p>

        {inCart !== null ? (
          <div className="product-count">
            <div className="counter">
              <div
                className="minus"
                onClick={(event) =>
                  decrementProductCount(event, inCart.id, inCart.quantity)
                }
                aria-hidden="true"
              >
                -
              </div>
              <div className="count">{inCart.quantity}</div>
              <div
                className="plus"
                onClick={(event) =>
                  incrementProductCount(event, inCart.id, inCart.quantity)
                }
                aria-hidden="true"
              >
                +
              </div>
            </div>
          </div>
        ) : (
          <button type="button" onClick={(event) => addItemToCart(event)}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}
