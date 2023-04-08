import { Component } from "react";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { FcGenericSortingDesc } from "react-icons/fc";

import { FaSearch } from "react-icons/fa";

import PopularResDetails from "../PopularResDetails";

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import "./index.css";

const apiStatusConstant = {
  initial: "Initial",
  success: "Success",
  failure: "Failure",
  inProgress: "InProgress",
};

const sortList = [
  {
    id: "Lowest",
    displayText: "LOWEST",
  },
  {
    id: "Highest",
    displayText: "HIGHEST",
  },
];

class PopularRestaurants extends Component {
  state = {
    popularResApiStatus: apiStatusConstant.initial,
    popularResListData: [],
    filterSortItem: sortList[0].id,
    activePage: 1,
    noOfPages: 0,
    searchInput: "",
  };

  componentDidMount() {
    this.getPopularResData();
  }

  getPopularResData = async () => {
    this.setState({ popularResApiStatus: apiStatusConstant.inProgress });
    const { activePage, filterSortItem, searchInput } = this.state;
    const LIMIT = 6;
    const offset = (activePage - 1) * LIMIT;
    const PopularResApi = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${filterSortItem}&search=${searchInput}`;
    const token = Cookies.get("jwt_token");
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(PopularResApi, options);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      const totalPages = responseData.total;
      const noPages = Math.ceil(totalPages / LIMIT);
      const updatedData = responseData.restaurants.map((each) => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        menuType: each.menu_type,
        loaction: each.location,
        opensAt: each.opens_at,
        cuisine: each.cuisine,
        costForTwo: each.cost_for_two,
        userRating: {
          rating: each.user_rating.rating,
          totalReviews: each.user_rating.total_reviews,
        },
      }));
      this.setState({
        popularResApiStatus: apiStatusConstant.success,
        popularResListData: updatedData,
        noOfPages: noPages,
      });
    } else {
      this.setState({ popularResApiStatus: apiStatusConstant.failure });
    }
  };

  renderPopularResLoadingView = () => (
    <div className="popularRes-loading-container">
      <TailSpin color="blue" height={50} width={50} />
    </div>
  );

  onClickDecPage = () => {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.setState(
        (prevState) => ({
          activePage: prevState.activePage - 1,
        }),
        this.getPopularResData
      );
    }
  };

  onClickIncPage = () => {
    const { activePage, noOfPages } = this.state;
    if (activePage < noOfPages) {
      this.setState(
        (prevState) => ({
          activePage: prevState.activePage + 1,
        }),
        this.getPopularResData
      );
    }
  };

  onClickPage = (index) => {
    this.setState({ activePage: index + 1 }, this.getPopularResData);
  };

  renderPopularResSuccessView = () => {
    const { popularResListData, activePage, noOfPages } = this.state;
    console.log(noOfPages);

    return (
      <>
        <ul className="popularRes-list-items-container">
          {popularResListData.map((each) => (
            <PopularResDetails each={each} key={each.id} />
          ))}
        </ul>
        {noOfPages > 1 && (
          <div className="popularRes-pagination-container">
            <button
              type="button"
              className="png-btn"
              onClick={this.onClickDecPage}
            >
              <BsFillArrowLeftSquareFill className="png-icon" />
            </button>
            {Array(noOfPages)
              .fill(null)
              .map((each, index) => (
                <button
                  className={
                    activePage === index + 1
                      ? "active-page-no"
                      : "inactive-page-no"
                  }
                  key={index}
                  onClick={() => this.onClickPage(index)}
                >
                  {index + 1}
                </button>
              ))}
            <button
              type="button"
              className="png-btn"
              onClick={this.onClickIncPage}
            >
              <BsFillArrowRightSquareFill className="png-icon" />
            </button>
          </div>
        )}
      </>
    );
  };

  renderPopularResFailureView = () => (
    <div className="popularRes-failure-container">
      <h1 className="popular-failure-title">Search Results Not Found!</h1>
    </div>
  );

  renderPopularRes = () => {
    const { popularResApiStatus } = this.state;
    switch (popularResApiStatus) {
      case apiStatusConstant.success:
        return this.renderPopularResSuccessView();
      case apiStatusConstant.failure:
        return this.renderPopularResFailureView();
      case apiStatusConstant.inProgress:
        return this.renderPopularResLoadingView();
      default:
        return null;
    }
  };

  onChangeFilterOption = (event) => {
    this.setState(
      { filterSortItem: event.target.value },
      this.getPopularResData
    );
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onclickSearch = () => {
    this.getPopularResData();
  };

  render() {
    const { filterSortItem, searchInput } = this.state;
    return (
      <div className="popular-res-container">
        <div className="popular-res-topcontent-container">
          <h1 className="popularRes-title">Popular Restaurants</h1>
          <p className="popularRes-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>

          <div className="pop-res-flex-container">
            <div className="sorting-container">
              <FcGenericSortingDesc className="sorted-icon" />
              <select
                id="sorting"
                className="sort-item-list-container"
                value={filterSortItem}
                onChange={this.onChangeFilterOption}
              >
                {sortList.map((each) => (
                  <option
                    className="sort-options"
                    key={each.id}
                    value={each.id}
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search For Restaurants"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <FaSearch className="search-icon" onClick={this.onclickSearch} />
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        {this.renderPopularRes()}
      </div>
    );
  }
}

export default PopularRestaurants;
