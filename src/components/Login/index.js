import { Component } from "react";

import Cookies from "js-cookie";

import "./index.css";

import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    isLogin: false,
    userName: "",
    userPassword: "",
    loginError: "",
    isChecked: false,
  };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangeUserPassword = (event) => {
    this.setState({ userPassword: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ isChecked: event.target.checked });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { userName, userPassword } = this.state;
    const LoginApi = "https://apis.ccbp.in/login";
    const options = {
      method: "post",
      body: JSON.stringify({ username: userName, password: userPassword }),
    };
    const responseUrl = await fetch(LoginApi, options);
    const responseData = await responseUrl.json();
    if (responseUrl.ok) {
      const { history } = this.props;
      Cookies.set("jwt_token", responseData.jwt_token, { expires: 30 });
      history.replace("/");
    } else {
      this.setState({ isLogin: true, loginError: responseData.error_msg });
    }
  };

  renderLoginData = () => {
    const { userName, userPassword, isLogin, loginError, isChecked } =
      this.state;
    const token = Cookies.get("jwt_token");
    if (token !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="flex-login-container">
        <div className="sm-login-logo-container">
          <img
            src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1676704486/Rectangle_1457_rulsh7.png"
            alt="login website"
            className="sm-login-logo"
          />
        </div>
        <div className="lg-login-logo-container">
          <img
            src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1676706474/Rectangle_1456_pids4d.png"
            alt="login website"
            className="lg-login-logo"
          />
        </div>
        <div className="login-content-container">
          <h1 className="login-title">Login</h1>
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="user-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={this.onChangeUserName}
              placeholder="Username"
              className="user-input"
            />
            <label htmlFor="password" className="user-password-label">
              PASSWORD
            </label>
            {isChecked ? (
              <input
                type="text"
                id="password"
                value={userPassword}
                onChange={this.onChangeUserPassword}
                placeholder="Password"
                className="user-password-input"
              />
            ) : (
              <input
                type="password"
                id="password"
                value={userPassword}
                onChange={this.onChangeUserPassword}
                placeholder="Password"
                className="user-password-input"
              />
            )}
            <div className="flex-checkbox-continer">
              <input
                id="checkbox"
                type="checkbox"
                value={isChecked}
                onChange={this.onChangeCheckbox}
                className="password-checkbox"
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Password
              </label>
            </div>
            {isLogin && <p className="login-error-msg">{loginError}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  render() {
    return <div className="login-container">{this.renderLoginData()}</div>;
  }
}

export default Login;
