import { Component } from 'react'

import { HiCurrencyRupee } from 'react-icons/hi'

import { AiFillStar, AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'

import CartContext from '../../CartContext/CartContext'

import './index.css'

class SpecificRestaurantFoodItemsDetails extends Component {
  state = {
    isAddItem: false,
    quantity: 1,
  }

  render() {
    const { each } = this.props
    const { isAddItem, quantity } = this.state
    return (
      <CartContext.Consumer>
        {(value) => {
          const { onClickAddToCartItem, onClickDecCount, onClickIncCount } =
            value

          this.onClickToggleAddToCartText = () => {
            this.setState({ isAddItem: true })
            onClickAddToCartItem({ ...each, quantity })
          }

          this.onClickDecQuantity = () => {
            const { quantity } = this.state
            if (quantity > 1) {
              this.setState((prevState) => ({
                quantity: prevState.quantity - 1,
              }))
            } else {
              this.setState({ isAddItem: false })
            }
            onClickDecCount(each.id)
          }

          this.onClickIncQuantity = () => {
            this.setState((prevState) => ({
              quantity: prevState.quantity + 1,
            }))
            onClickIncCount(each.id)
          }

          return (
            <li className='food-item-container'>
              <img src={each.imageUrl} alt={each.name} className='food-img' />
              <div className='food-item-content-container'>
                <h1 className='food-name'>{each.name}</h1>
                <div className='food-price-container'>
                  <HiCurrencyRupee className='currency-food-icon' />
                  <p className='food-price'>{each.cost}</p>
                </div>
                <div className='food-rating-container'>
                  <AiFillStar className='star-food-icon' />
                  <p className='food-rating'>{each.rating}</p>
                </div>
                {isAddItem ? (
                  <div className='quantity-flex-container'>
                    <button
                      type='button'
                      className='dec-btn'
                      onClick={this.onClickDecQuantity}
                    >
                      <AiFillMinusSquare className='minus-icon' />
                    </button>
                    <p className='qunatity-text'>{quantity}</p>
                    <button
                      type='button'
                      className='inc-btn'
                      onClick={this.onClickIncQuantity}
                    >
                      <AiFillPlusSquare className='plus-icon' />
                    </button>
                  </div>
                ) : (
                  <button
                    type='button'
                    className='food-add-btn'
                    onClick={this.onClickToggleAddToCartText}
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default SpecificRestaurantFoodItemsDetails
