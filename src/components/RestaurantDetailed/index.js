/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer/index'
import FoodItem from '../FoodItem'
import NavBar from '../NavBar'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class RestaurantDetailed extends Component {
  state = {apiStatus: apiStatusConstants.initial, details: {}}

  componentDidMount = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('id', id)
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        rating: data.rating,
        imageUrl: data.image_url,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
          id: each.id,
        })),
        location: data.location,
        opensAt: data.opens_at,
        reviewsCount: data.reviews_count,
        itemsCount: data.items_count,
      }
      // console.log('up', updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        details: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {}

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="Puff" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {details} = this.state
    const {
      imageUrl,
      name,
      cuisine,

      location,
      rating,
      reviewsCount,
      costForTwo,
      foodItems,
    } = details

    return (
      <>
        <div className="restaurantDetailed-top-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-item-img"
          />
          <div className="restaurant-details-cont">
            <h1 className="r-head1">{name}</h1>
            <p className="r-para1">{cuisine}</p>
            <p className="r-para1">{location}</p>
            <div className="rating-right">
              <div className="rating-2">
                <p className="r-para1 star">{rating}</p>
                <p className="r-para2 marg">{reviewsCount} Ratings</p>
              </div>
              <div className="rating-3">
                <p className="r-para3">₹ {costForTwo}</p>
                <p className="r-para2 marg">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items">
          {foodItems.map(each => (
            <FoodItem key={each.id} each={each} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  getView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        {this.getView()}
      </>
    )
  }
}

export default RestaurantDetailed
