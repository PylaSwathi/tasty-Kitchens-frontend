/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import './index.css'

const RestaurantItem = props => {
  const {each} = props
  const {id, imageUrl, menuType, userRating, name, totalReviews} = each

  return (
    <Link to={`/restaurant/${id}`} className="rest-link">
      <li className="restaurant-item" testid=" restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-item-content">
          <p className="restaurant-head">{name}</p>
          <p className="restaurant-para">{menuType}</p>
          <div className="rating-cont">
            <p className="rating-head"> {` ${userRating}`}</p>
            <p className="restaurant-para2">{` (${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
