/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import './index.css'

class FoodItem extends Component {
  constructor(props) {
    super(props)
    const storedItems = JSON.parse(localStorage.getItem('cartData')) || []
    this.state = {itemsAdded: storedItems}
  }

  addToCart = () => {
    const {each} = this.props
    const {id, cost, name, imageUrl} = each
    //  console.log('id', itemId)
    const updatedData = {
      id,
      quantity: 1,
      cost,
      name,
      imageUrl,
    }

    this.setState(
      prevState => ({
        itemsAdded: [...prevState.itemsAdded, updatedData],
      }),
      () => {
        const {itemsAdded} = this.state
        localStorage.setItem('cartData', JSON.stringify(itemsAdded))
      },
    )
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

  render() {
    const {each} = this.props
    const {imageUrl, id, rating, cost, name} = each
    const {itemsAdded} = this.state
    const ItemAddedOrNot = itemsAdded.filter(item => item.id === id)

    console.log('i', ItemAddedOrNot)
    return (
      <li className="food-item-detailed" testid="foodItem">
        <img src={imageUrl} alt="food" className="food-item-img" />
        <div className="detail">
          <h1 className="detail-para">{name}</h1>
          <p className="detail-para2">₹ {cost}</p>
          <p className="detail-para3">{rating}</p>
          {ItemAddedOrNot.length !== 0 ? (
            <div className="cart-cont">
              <button
                type="button"
                className="cart-btn1"
                onClick={() => this.decrementItem(id)}
                testid="decrement-count"
              >
                <img
                  src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439447/Frame_14_dxppq1.svg"
                  alt="decrement"
                />
              </button>
              <p className="added" testid="active-count">
                {ItemAddedOrNot[0].quantity}
              </p>
              <button
                type="button"
                className="cart-btn2"
                onClick={() => this.incrementItem(id)}
                testid="increment-count"
              >
                <img
                  src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704439457/Frame_15_p9xomh.svg"
                  alt="increment"
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="buttonAdd"
              onClick={this.addToCart}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
