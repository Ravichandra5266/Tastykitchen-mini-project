import { useState } from 'react'

import EmptyCartContainer from '../EmptyCartContainer'

import Navbar from '../Navbar'

import MyCartItemsDetails from '../MyCartItemsDetails'

import TotalSummary from '../TotalSummary'

import Footer from '../Footer'

import PaymentSuccess from '../PaymentSuccess'

import CartContext from '../../CartContext/CartContext'

import './index.css'

const MyCart = () => {
  const [isOrder, setOrder] = useState(false)
  const onclickPlaceOrder = () => {
    setOrder(true)
  }

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList, onClickDecCount, onClickIncCount } = value
        const renderMyCartDetails = () => (
          <>
            {isOrder ? (
              <PaymentSuccess />
            ) : (
              <div>
                <ul className='my-cart-items-container'>
                  {cartList.map((each) => (
                    <MyCartItemsDetails
                      each={each}
                      key={each.id}
                      onClickIncCount={onClickIncCount}
                      onClickDecCount={onClickDecCount}
                    />
                  ))}
                </ul>
                <hr className='hr-line' />
                <TotalSummary cartList={cartList} />
                <div className='order-container'>
                  <button className='order-btn' onClick={onclickPlaceOrder}>
                    Place Order
                  </button>
                </div>
                <Footer />
              </div>
            )}
          </>
        )
        return (
          <div className='my-cart-container'>
            <Navbar />
            {cartList.length > 0 ? (
              renderMyCartDetails()
            ) : (
              <EmptyCartContainer />
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default MyCart
