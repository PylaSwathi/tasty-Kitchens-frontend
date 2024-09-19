/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Offers from '../Offers/index'
import RestaurantItem from '../RestaurantItem/index'
import Footer from '../Footer/index'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import NavBar from '../NavBar'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeOptionId: 'Lowest',
    activePage: 1,
    restaurants: [],
    total: 0,
  }

  componentDidMount = async () => {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, activeOptionId} = this.state
    console.log('a', activeOptionId)
    const limit = 9
    const offset = (activePage - 1) * limit
    const search = ''
    const apiUrl = `http://localhost:9092/api/restaurants/restaurants-list?offset=${offset}&limit=9&sortByRating=${activeOptionId}`
    const apiUrl2 = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${activeOptionId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log('r', response)
    if (response.ok === true) {
      const data = await response.json()
      console.log('d', data)
      // const {restaurants, total} = data
      const updatedRestaurants = data.map(each => ({
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
        userRating: each.rating,
        menuType: each.menuType,
        totalReviews: each.totalReviews, // added
      }))
      // const updated = updatedRestaurants.map(each => ({
      //   ...each,
      //   userRating: {
      //     rating: each.userRating.rating,
      //     totalReviews: each.userRating.total_reviews,
      //   },
      // }))
      console.log('updated', updatedRestaurants)

      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurants: updatedRestaurants,
        total: 30,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSortBy = event => {
    console.log('val', event.target.value)
    this.setState({activeOptionId: event.target.value}, this.getRestaurants)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="Puff" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="failure"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  getLeftPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  getRightPage = () => {
    const {activePage, total} = this.state
    const totalPages = Math.ceil(total / 9)
    if (activePage !== totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  renderSuccessView = () => {
    const {activeOptionId, restaurants, activePage, total} = this.state
    const totalPages = Math.ceil(total / 9)

    return (
      <>
        <Offers />
        <div className="restaurants-container">
          <h1 className="restaurants-heading">Popular Restaurants</h1>
          <div className="sort-container">
            <p className="para2">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-section">
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704040494/sort_mbnvts.svg"
                alt="sort"
                className="sort-image"
              />
              <p className="select-option1">Sort By </p>
              <select
                className="sort-by-select"
                value={activeOptionId}
                onChange={this.onChangeSortBy}
              >
                {sortByOptions.map(each => (
                  <option
                    key={each.id}
                    value={each.value}
                    className="select-option"
                  >
                    {each.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="restaurant-items">
            {restaurants.map(each => (
              <RestaurantItem each={each} key={each.id} />
            ))}
          </ul>
          <div className="pagination-cont">
            <button
              type="button"
              onClick={this.getLeftPage}
              testid="pagination-left-button"
              className="page-btn"
            >
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704123907/Icon_ghy8vj.svg"
                alt="left"
                className="arrow"
              />
            </button>

            <p className="arrow-page1" testid="active-page-number">
              {activePage}
            </p>
            <p className="arrow-page">{`of ${totalPages}`}</p>
            <button
              type="button"
              onClick={this.getRightPage}
              className="page-btn"
              testid="pagination-right-button"
            >
              <img
                src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704123812/Icon_d3swoo.svg"
                alt="right"
                className="arrow"
              />
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  getView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="home-container">{this.getView()}</div>
      </>
    )
  }
}

export default Home
