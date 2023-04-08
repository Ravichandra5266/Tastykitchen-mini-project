import { withRouter } from 'react-router-dom'

import './index.css'

const EmptyCartContainer = (props) => {
  const onClickProducts = () => {
    const { history } = props

    history.replace('/')
  }
  return (
    <div className='emp-container'>
      <img
        src='https://res.cloudinary.com/dnmaskg3n/image/upload/v1677469882/cooking_1_sqbmzf.png'
        alt='empty cart'
        className='empt-img'
      />
      <h1 className='emp-title'>No Orders Yet!</h1>
      <p className='emp-para'>
        Your cart is empty. Add something from the menu.
      </p>
      <button className='emp-btn' onClick={onClickProducts}>
        Order Now
      </button>
    </div>
  )
}

export default withRouter(EmptyCartContainer)
