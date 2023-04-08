import { Component } from "react";

import Cookies from "js-cookie";

import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import { Link, withRouter, NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";

import { AiFillCloseCircle } from "react-icons/ai";

import CartContext from "../../CartContext/CartContext";

import "./index.css";

class Navbar extends Component {
  state = {
    isHamActive: false,
  };

  onClickHam = () => {
    this.setState({ isHamActive: true });
  };

  onClickClose = () => {
    this.setState({ isHamActive: false });
  };

  onClickLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/");
  };

  renderNav = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const { isHamActive } = this.state;
        const cartCount = cartList.length;

        return (
          <nav className="nav-container">
            <div className="nav-flex-container">
              <div className="nav-logo-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1676706562/Frame_274_m9mhjd.png"
                    alt="nav logo"
                    className="nav-logo"
                  />
                </Link>
                <h1 className="nav-logo-title">Tasty Kitchens</h1>
              </div>
              <button
                type="button"
                className="nav-ham-btn"
                onClick={this.onClickHam}
              >
                <GiHamburgerMenu className="ham-icon" />
              </button>
              <ul className="lg-nav-items-list-container">
                <NavLink
                  activeClassName="link-active"
                  to="/"
                  exact
                  className="nav-link"
                >
                  <li className="nav-link-item">Home</li>
                </NavLink>
                <NavLink
                  activeClassName="link-active"
                  to="/cart"
                  className="nav-link"
                >
                  <div className="cart-count-container">
                    <li className="nav-link-cart-item">Cart</li>
                    {cartCount > 0 && <p className="cart-count">{cartCount}</p>}
                  </div>
                </NavLink>
                <Popup
                  trigger={
                    <li className="nav-link-item">
                      <button type="button" className="nav-logout-btn">
                        Logout
                      </button>
                    </li>
                  }
                  modal
                >
                  {(close) => (
                    <div className="pop-container">
                      <h1 className="pop-title">
                        Are You Sure You Want To Logout!
                      </h1>

                      <div className="logout-pop-container">
                        <button
                          type="button"
                          className="pop-cancel-btn"
                          onClick={() => {
                            close();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="pop-conform-btn"
                          onClick={this.onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </ul>
            </div>
            {isHamActive && (
              <div className="sm-nav-items-flex-container">
                <ul className="sm-nav-items-list-container">
                  <NavLink
                    activeClassName="link-active"
                    to="/"
                    exact
                    className="nav-link"
                  >
                    <li className="nav-link-item">Home</li>
                  </NavLink>
                  <NavLink
                    activeClassName="link-active"
                    to="/cart"
                    className="nav-link"
                  >
                    <div className="cart-count-container">
                      <li className="nav-link-cart-item">Cart</li>
                      {cartCount > 0 && (
                        <p className="cart-count">{cartCount}</p>
                      )}
                    </div>
                  </NavLink>
                  <Popup
                    trigger={
                      <li className="nav-link-item">
                        <button type="button" className="nav-logout-btn">
                          Logout
                        </button>
                      </li>
                    }
                    modal
                  >
                    {(close) => (
                      <div className="pop-container">
                        <h1 className="pop-title">
                          Are You Sure You Want To Logout!
                        </h1>
                        <div className="logout-pop-container">
                          <button
                            type="button"
                            className="pop-cancel-btn"
                            onClick={() => {
                              close();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="pop-conform-btn"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </ul>
                <button
                  type="button"
                  className="nav-close-btn"
                  onClick={this.onClickClose}
                >
                  <AiFillCloseCircle className="nav-cross-icon" />
                </button>
              </div>
            )}
          </nav>
        );
      }}
    </CartContext.Consumer>
  );
  render() {
    return <>{this.renderNav()}</>;
  }
}

export default withRouter(Navbar);
