import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const goToHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-cont">
      <img
        src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704528494/erroring_1_giymgb.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button className="home-btn" type="button" onClick={goToHomePage}>
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
