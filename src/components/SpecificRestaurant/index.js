import { Component } from 'react'

import { TailSpin } from 'react-loader-spinner'

import Cookies from 'js-cookie'

import { AiFillStar } from 'react-icons/ai'

import { HiCurrencyRupee } from 'react-icons/hi'

import Navbar from '../Navbar'

import SpecificRestaurantFoodItemsDetails from '../SpecificRestaurantFoodItemDetails'

import Footer from '../Footer'

import './index.css'

const apiStatusConstant = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  inProgress: 'InProgress',
}

class SpecificRestaurant extends Component {
  state = {
    spResApiStatus: apiStatusConstant.initial,
    bannerList: {},
    foodItemsList: [],
    quantity: 0,
  }

  componentDidMount() {
    this.renderSpResData()
  }

  renderSpResData = async () => {
    this.setState({ spResApiStatus: apiStatusConstant.inProgress })
    const { match } = this.props
    const { params } = match
    const { id } = params
    const SpResApi = `https://apis.ccbp.in/restaurants-list/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(SpResApi, options)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      const data = responseData

      const updatedDataBannerList = {
        costForTwo: data.cost_for_two,
        id: data.id,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        name: data.name,
        location: data.location,
        imageUrl: data.image_url,
        cuisine: data.cuisine,
      }

      const updatedFoodItems = data.food_items.map((each) => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
        name: each.name,
      }))
      this.setState({
        spResApiStatus: apiStatusConstant.success,
        foodItemsList: updatedFoodItems,
        bannerList: updatedDataBannerList,
      })
    } else {
      this.setState({ spResApiStatus: apiStatusConstant.failure })
    }
  }

  renderSpResLoadingView = () => (
    <div className='spRes-loading-container'>
      <TailSpin color='blue' height={50} width={50} />
    </div>
  )

  renderSpResSuccessView = () => {
    const { bannerList, foodItemsList } = this.state

    return (
      <>
        <div className='spRes-Banner-container'>
          <img
            src={bannerList.imageUrl}
            alt={bannerList.name}
            className='banner-img'
          />
          <div className='banner-section-right-container'>
            <h1 className='banner-name'>{bannerList.name}</h1>
            <p className='banner-cusine'>{bannerList.cuisine}</p>
            <p className='banner-location'>{bannerList.location}</p>
            <div className='banner-bottom-flex-container'>
              <div className='banner-bottom-left-container'>
                <div className='banner-rating-container'>
                  <AiFillStar className='rating-icon' />
                  <p className='rating-text'>{bannerList.rating}</p>
                </div>
                <p className='reviews-count'>
                  {`${bannerList.reviewsCount}+ Ratings`}
                </p>
              </div>
              <div>
                <div className='banner-price-container'>
                  <HiCurrencyRupee className='currency-icon ' />
                  <p className='cost-text'>{bannerList.costForTwo}</p>
                </div>
                <p className='cost-text'>Cost For Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className='spRes-food-items-container'>
          {foodItemsList.map((each) => (
            <SpecificRestaurantFoodItemsDetails each={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }
  renderSpRes = () => {
    const { spResApiStatus } = this.state
    switch (spResApiStatus) {
      case apiStatusConstant.success:
        return this.renderSpResSuccessView()
      case apiStatusConstant.failure:
        return this.renderSpResFailureView()
      case apiStatusConstant.inProgress:
        return this.renderSpResLoadingView()
      default:
        return null
    }
  }
  render() {
    return (
      <div className='spRes-container'>
        <Navbar />
        {this.renderSpRes()}
        <Footer />
      </div>
    )
  }
}

export default SpecificRestaurant
