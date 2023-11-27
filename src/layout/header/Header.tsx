import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import "./header.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/blinkitlogo.jpg";
import searchbar from "../../assets/icons/searchbar.png";
import cart from "../../assets/icons/cart.png";
import Address from "../../modals/Address.tsx";

import Login from "../../modals/Login.tsx";
import Cart from "../../modals/Cart.tsx";

export default function Header() {
  const [deliveryTime] = useState(Math.floor(Math.random() * 10 + 10));
  const [showAdressPopup, setShowAddressPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const customerAddress = useSelector((state) => state.address);

  const navigate = useNavigate();
  const location = useLocation();

  const { total } = useSelector((state) => state.cart);
  const cartlen = useSelector((state) => state.cart);

  console.log();

  // address popup toggle function
  const togglePopupActive = (): void => {
    setShowAddressPopup(!showAdressPopup);
  };

  // function to show and hide login popup
  const showLoginForm = (): void => {
    setShowLoginPopup(true);
  };
  const hideLoginForm = (): void => {
    setShowLoginPopup(false);
  };
  // function to show and hide login popup

  // function to toggle between cart popup state
  const toggleCartPopup = (): void => {
    setShowCartPopup(!showCartPopup);
  };
  // function to toggle between cart popup state

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        hideLoginForm();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <div className="header-wrap">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {location.pathname === "/search" ? (
            <div className="search-product">
              <input type="text" placeholder="search for atta dal and more" />
              <img src={searchbar} alt="" />
            </div>
          ) : (
            <>
              <div
                className="address-bar"
                onClick={togglePopupActive}
                aria-hidden="true"
              >
                <h3>Delivery in {deliveryTime} minutes</h3>
                <p>
                  {customerAddress.address ||
                    "C8GH+6WJ, Gowlidoddy, Hyderabad, Telangana 500032, India"}
                </p>
              </div>
              <div
                className="search-bar"
                onClick={() => navigate("search")}
                aria-hidden="true"
              >
                <img src={searchbar} alt="" />
                <div className="search-animate">
                  <p id="animation-text-1" className="goup">
                    Search &quot;egg&quot;
                  </p>
                  <p id="animation-text-2" className="goup">
                    Search &quot;rice&quot;
                  </p>
                  <p id="animation-text-3" className="goup">
                    Search &quot;sugar&quot;
                  </p>
                  <p id="animation-text-4" className="goup">
                    Search &quot;chips&quot;
                  </p>
                </div>
              </div>
              <div className="log-user">
                <button type="button" onClick={showLoginForm}>
                  Login
                </button>
              </div>
            </>
          )}

          <div className="user-cart">
            <button type="button" onClick={toggleCartPopup}>
              <img src={cart} alt="" />

              {total > 0 ? (
                <span>
                  {cartlen.cart.length} items
                  <br /> ₹{total}
                </span>
              ) : (
                <span> My Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* portal for address */}
      {showAdressPopup &&
        createPortal(
          <Address togglePopupActive={togglePopupActive} />,
          document.body
        )}
      {/* portal for login form */}
      {showLoginPopup &&
        createPortal(<Login hideLoginForm={hideLoginForm} />, document.body)}
      {/* portal for cart sidebar */}
      {showCartPopup &&
        createPortal(
          <Cart closeCartSidebar={toggleCartPopup} />,
          document.body
        )}
    </>
  );
}
