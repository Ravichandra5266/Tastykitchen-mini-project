import { withRouter } from 'react-router-dom'

import CartContext from '../../CartContext/CartContext'

import './index.css'

const PaymentSuccess = (props) => (
  <CartContext.Consumer>
    {(value) => {
      const { onClickRemoveLocal } = value
      const onClickHome = () => {
        const { history } = props
        history.replace('/')
        onClickRemoveLocal()
      }
      return (
        <div className='payment-success-container'>
          <img
            src='https://res.cloudinary.com/dnmaskg3n/image/upload/v1677470862/Vector_bbyaeu.png'
            alt='success'
            className='payment-img'
          />
          <h1 className='payment-title'>Payment Successful</h1>
          <p className='payment-para'>
            Thank you for orderingYour payment is successfully completed.
          </p>
          <button type='button' className='home-btn' onClick={onClickHome}>
            Go To Home Page
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(PaymentSuccess)
