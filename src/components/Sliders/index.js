import { Component } from "react";

import Slider from "react-slick";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import "./index.css";

const apiStatusConstant = {
  initial: "Initial",
  success: "Success",
  failure: "Failure",
  inProgress: "InProgress",
};

class Sliders extends Component {
  state = {
    slidersApiStatus: apiStatusConstant.initial,
    slidersListData: [],
  };

  componentDidMount() {
    this.getSlidersData();
  }

  getSlidersData = async () => {
    this.setState({ slidersApiStatus: apiStatusConstant.inProgress });
    const SlidersApi = "https://apis.ccbp.in/restaurants-list/offers";
    const token = Cookies.get("jwt_token");
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(SlidersApi, options);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      const updatdData = responseData.offers.map((each) => ({
        id: each.id,
        imageUrl: each.image_url,
      }));
      this.setState({
        slidersApiStatus: apiStatusConstant.success,
        slidersListData: updatdData,
      });
    } else {
      this.setState({ slidersApiStatus: apiStatusConstant.failure });
    }
  };

  renderSlidersLoadingView = () => (
    <div className="sliders-loading-container">
      <TailSpin color="blue" height={50} width={50} />
    </div>
  );

  renderSlidersSuccessView = () => {
    const { slidersListData } = this.state;
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      infinite: true,
      dotsClass: "slick-dots",
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    };
    return (
      <ul className="sliders-container">
        <Slider {...settings}>
          {slidersListData.map((each) => (
            <li key={each.id}>
              <img src={each.imageUrl} alt="slider" className="slider-img" />
            </li>
          ))}
        </Slider>
      </ul>
    );
  };

  onClickSlidersRetry = () => {
    this.getSlidersData();
  };

  renderSlidersFailureView = () => (
    <div className="sliders-failure-container">
      <button
        type="button"
        className="sliders-failure-btn"
        onClick={this.onClickSlidersRetry}
      >
        Retry
      </button>
    </div>
  );

  renderSliders = () => {
    const { slidersApiStatus } = this.state;
    switch (slidersApiStatus) {
      case apiStatusConstant.success:
        return this.renderSlidersSuccessView();
      case apiStatusConstant.failure:
        return this.renderSlidersFailureView();
      case apiStatusConstant.inProgress:
        return this.renderSlidersLoadingView();
      default:
        return null;
    }
  };

  render() {
    return <div className="sliders-page-container">{this.renderSliders()}</div>;
  }
}

export default Sliders;
