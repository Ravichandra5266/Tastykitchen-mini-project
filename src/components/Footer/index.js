import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

import { FaPinterestSquare } from "react-icons/fa";

import "./index.css";

const Footer = () => (
  <div className="footer-container">
    <div className="flex-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1678093534/Group_7420_orzlwz.png"
        alt="footer logo"
        className="footer-logo"
      />
      <h1 className="footer-title">Tasty Kitchens</h1>
    </div>
    <p className="footer-dis">
      The only thing we are serious about is food. Contact us on
    </p>
    <ul className="flex-contaner-icons">
      <li className="flex-icon">
        <FaPinterestSquare className="footer-icons" />
      </li>
      <li className="flex-icon">
        <BsInstagram className="footer-icons" />
      </li>
      <li className="flex-icon">
        <BsTwitter className="footer-icons" />
      </li>
      <li className="flex-icon">
        <BsFacebook className="footer-icons" />
      </li>
    </ul>
  </div>
);

export default Footer;
