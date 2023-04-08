import { HiCurrencyRupee } from 'react-icons/hi'

import './index.css'

const TotalSummary = (props) => {
  const { cartList } = props
  let totalSum = 0
  cartList.forEach((each) => {
    totalSum += each.quantity * each.cost
  })
  return (
    <div className='total-container'>
      <h1 className='total-title'>Order Total :</h1>
      <div className='total-content-container'>
        <HiCurrencyRupee className='total-icons' />
        <p className='total-sum'>{`${totalSum}.00`}</p>
      </div>
    </div>
  )
}

export default TotalSummary
