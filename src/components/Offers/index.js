/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Offers extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    carousals: [],
  }

  componentDidMount = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const {offers} = data
      const updatedOffers = offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        carousals: updatedOffers,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
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

  renderSuccessView = () => {
    const {carousals} = this.state
    const settings = {
      dots: true,
    }
    return (
      <ul className="ul-list">
        <Slider {...settings}>
          {carousals.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt="offer" className="carousal-image" />
            </li>
          ))}
        </Slider>
      </ul>
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
    return <div className="container">{this.getView()}</div>
  }
}

export default Offers
