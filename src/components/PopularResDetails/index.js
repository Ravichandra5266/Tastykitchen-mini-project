import { Link } from "react-router-dom";

import { AiTwotoneStar } from "react-icons/ai";

import "./index.css";

const PopularResDetails = (props) => {
  const { each } = props;
  const { id, name, cuisine, userRating, loaction, imageUrl, opensAt } = each;
  return (
    <Link to={`/restaurant/${id}`} className="route-link">
      <li>
        <div className="food-item-flex-container">
          <img src={imageUrl} alt={name} className="popRes-img" />
          <div className="food-item-content-container">
            <h1 className="popRes-title">{name}</h1>
            <p className="popRes-food-type">{cuisine}</p>
            <p className="popRes-timings">{opensAt}</p>
            <p className="popRes-location">{loaction}</p>
            <div className="popRes-rating-container">
              <AiTwotoneStar className="star-icon" />
              <p className="popRes-rating">
                {userRating.rating}
                <span className="popRes-rating-count">{`(${userRating.totalReviews} ratings)`}</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PopularResDetails;
