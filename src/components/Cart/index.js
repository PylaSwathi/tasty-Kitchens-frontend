/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar/index'
import Footer from '../Footer'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class Cart extends Component {
  constructor(props) {
    super(props)
    const cartItems = JSON.parse(localStorage.getItem('cartData')) || []
    this.state = {itemsAdded: cartItems, orderPlaced: false}
  }

  clickOrder = () => {
    localStorage.removeItem('cartData')
    this.setState({orderPlaced: true})
  }

  decrementItem = itemId => {
    this.setState(
      prevState => ({
        itemsAdded: prevState.itemsAdded
          .map(item =>
            item.id === itemId
              ? {...item, quantity: Math.max(0, item.quantity - 1)}
              : item,
          )
          .filter(each => each.quantity > 0),
      }),
      () => {
        const {itemsAdded} = this.state
        localStorage.setItem('cartData', JSON.stringify(itemsAdded))
      },
    )
  }

  incrementItem = itemId => {
    this.setState(
      prevState => ({
        itemsAdded: prevState.itemsAdded.map(item =>
          item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
        ),
      }),
      () => {
        const {itemsAdded} = this.state
        localStorage.setItem('cartData', JSON.stringify(itemsAdded))
      },
    )
  }

  renderNoOrdersView = () => (
    <>
      <NavBar />

      <div className="loader-container">
        <img
          src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704449710/cooking_1_spgcoe.png"
          alt=" empty cart"
          className="no-orders-img"
        />
        <h1 className="no-orders-head">No Order Yet!</h1>
        <p className="no-orders-para">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="order-now1">
            Order Now
          </button>
        </Link>
      </div>
    </>
  )

  renderPaymentView = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704554249/check-circle.1_1_r6so34.svg"
        alt="payment"
      />
      <p className="payment-para">Payment Successful</p>
      <p className="payment-para2">
        Thank you for ordering.Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="home-button">
          {' '}
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItemsView = () => {
    const {itemsAdded, orderPlaced} = this.state
    const totalPrice = itemsAdded.reduce(
      (total, item) => total + item.quantity * item.cost,
      0,
    )
    console.log('it', itemsAdded)
    return orderPlaced ? (
      <>
        <NavBar />
        <div className="loader-container">
          <img
            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704554249/check-circle.1_1_r6so34.svg"
            alt="payment"
          />
          <h1 className="payment-para">Payment Successful</h1>
          <p className="payment-para2">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <Link to="/">
            <button type="button" className="home-button">
              {' '}
              Go To Home Page
            </button>
          </Link>
        </div>
      </>
    ) : (
      <>
        <NavBar />
        <div className="cart-items">
          <ul className="cart-head">
            <li className="item">Item</li>
            <li className="item">Quantity</li>
            <li className="item">Price</li>
          </ul>

          <ul className="cart-items-cont mobile">
            {itemsAdded.map(each => (
              <li className="each-item-cnt" key={each.id} testid="cartItem">
                <ul className="cart-head1">
                  <li>
                    <img
                      src={each.imageUrl}
                      alt="cart"
                      className="cart-image"
                    />
                  </li>
                  <li>
                    <div className="mobile-cart-right-cont">
                      <h1 className="cart-name">{each.name}</h1>
                      <div className="cart-cont1">
                        <button
                          type="button"
                          onClick={() => this.decrementItem(each.id)}
                          className="decrement-btn"
                          testid="decrement-quantity"
                        >
                          <img
                            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439447/Frame_14_dxppq1.svg"
                            alt="decrement"
                          />
                        </button>
                        <p testid="item-quantity"> {each.quantity}</p>
                        <button
                          type="button"
                          onClick={() => this.incrementItem(each.id)}
                          className="increment-btn"
                          testid="increment-quantity"
                        >
                          <img
                            src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439457/Frame_15_p9xomh.svg"
                            alt="increment"
                          />
                        </button>
                      </div>
                      <p className="cost cost-mobile">₹ {each.cost}</p>
                    </div>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <ul className="cart-items-cont desktop">
            {itemsAdded.map(each => (
              <li className="each-item-cnt" key={each.id} testid="cartItem">
                <ul className="cart-head1">
                  <li>
                    <div className="card-item-box">
                      <img
                        src={each.imageUrl}
                        alt="cart"
                        className="cart-image"
                      />
                      <h1 className="cart-name">{each.name}</h1>
                    </div>
                  </li>
                  <li>
                    <div className="cart-cont1">
                      <button
                        type="button"
                        onClick={() => this.decrementItem(each.id)}
                        className="decrement-btn"
                        testid="decrement-quantity"
                      >
                        <img
                          src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439447/Frame_14_dxppq1.svg"
                          alt="decrement"
                        />
                      </button>
                      <p testid="item-quantity"> {each.quantity}</p>
                      <button
                        type="button"
                        onClick={() => this.incrementItem(each.id)}
                        className="increment-btn"
                        testid="increment-quantity"
                      >
                        <img
                          src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439457/Frame_15_p9xomh.svg"
                          alt="increment"
                        />
                      </button>
                    </div>
                  </li>
                  <li className="cost">₹ {each.cost}</li>
                </ul>
              </li>
            ))}
          </ul>
          <hr className="cart-line" />
          <div className="order-cont">
            <h1 className="order-total">Order Total:</h1>
            <div>
              <p className="order-total-para" testid="total-price">
                ₹ {totalPrice}
              </p>
              <button
                type="button"
                className="order-btn"
                onClick={this.clickOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {itemsAdded} = this.state

    if (itemsAdded.length === 0) {
      return this.renderNoOrdersView()
    }

    return this.renderCartItemsView()
  }
}

export default Cart
