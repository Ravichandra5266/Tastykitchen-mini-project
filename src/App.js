import { Switch, Route } from 'react-router-dom'

import { Component } from 'react'

import Login from './components/Login'

import Home from './components/Home'

import SpecificRestaurant from './components/SpecificRestaurant'

import ProtectedRouts from './components/ProtectedRoutes'

import MyCart from './components/MyCart'

import CartContext from './CartContext/CartContext'

import './App.css'

const getLocalCartList = () => {
  const LocalCartItems = JSON.parse(localStorage.getItem('cartData'))
  if (LocalCartItems === null) {
    return []
  }
  return LocalCartItems
}

class App extends Component {
  state = {
    cartList: getLocalCartList(),
  }

  onClickAddToCartItem = (value) => {
    const { cartList } = this.state
    const findProducts = cartList.find((each) => each.id === value.id)
    if (findProducts) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (findProducts.id === eachCartItem.id) {
            const updatedQuantity = value.quantity

            return { ...eachCartItem, quantity: updatedQuantity }
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, value]
      this.setState({ cartList: updatedCartList })
    }
  }
  onClickIncCount = (value) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((each) => {
        if (each.id === value) {
          return { ...each, quantity: each.quantity + 1 }
        }
        return each
      }),
    }))
  }

  onClickDecCount = (value) => {
    const { cartList } = this.state
    const findProducts = cartList.find((each) => each.id === value)
    if (findProducts.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((each) => {
          if (each.id === value) {
            return { ...each, quantity: each.quantity - 1 }
          }
          return each
        }),
      }))
    } else {
      const { cartList } = this.state
      const filterProducts = cartList.filter((each) => each.id !== value)
      this.setState({ cartList: filterProducts })
    }
  }

  onClickRemoveLocal = () => {
    this.setState({ cartList: [] })
  }

  render() {
    const { cartList } = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartContext.Provider
        value={{
          cartList,
          onClickAddToCartItem: this.onClickAddToCartItem,
          onClickIncCount: this.onClickIncCount,
          onClickDecCount: this.onClickDecCount,
          onClickRemoveLocal: this.onClickRemoveLocal,
        }}
      >
        <Switch>
          <Route exact path='/login' component={Login} />
          <ProtectedRouts exact path='/' component={Home} />
          <ProtectedRouts
            exact
            path='/restaurant/:id'
            component={SpecificRestaurant}
          />
          <ProtectedRouts exact path='/cart' component={MyCart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
