import { HiCurrencyRupee } from 'react-icons/hi'

import './index.css'

const MyCartItemsDetails = (props) => {
  const { each, onClickDecCount, onClickIncCount } = props
  const { name, imageUrl, cost, quantity, id } = each
  const onclickInc = () => {
    onClickIncCount(id)
  }

  const onclickDec = () => {
    onClickDecCount(id)
  }
  return (
    <li className='cart-details-items'>
      <div className='img-title-container'>
        <img src={imageUrl} alt={imageUrl} className='cart-img' />
        <h1 className='lg-title'>{name}</h1>
      </div>
      <div className='content-container'>
        <h1 className='sm-title'>{name}</h1>
        <div className='quantity-container'>
          <button type='button' className='q-btn' onClick={onclickDec}>
            -
          </button>
          <h1 className='quantity-text'>{quantity}</h1>
          <button type='button' className='q-btn' onClick={onclickInc}>
            +
          </button>
        </div>
        <div className='price-container'>
          <HiCurrencyRupee className='price-icon' />
          <h1 className='price-text'>{`${cost}.00`}</h1>
        </div>
      </div>
    </li>
  )
}

export default MyCartItemsDetails
