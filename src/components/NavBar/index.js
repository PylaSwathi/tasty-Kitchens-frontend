import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import './index.css'

class NavBar extends Component {
  state = {openMenu: false}

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  closeMenu = () => {
    this.setState({openMenu: false})
  }

  openMenu = () => {
    this.setState(prevState => ({openMenu: !prevState.openMenu}))
  }

  render() {
    const {openMenu} = this.state

    return (
      <>
        <nav className="nav-bar-container">
          <ul className="nav-list-items">
            <li className="logo-cont">
              <Link to="/" className="nav-link">
                <img
                  src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704002042/Frame_274_j4bik3.svg"
                  alt="website logo"
                  className="logo-img"
                />
              </Link>

              <p className="footer-head">Tasty Kitchens</p>
            </li>
            <li className="nav-item2 large">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item3 large">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="large">
              <button
                type="button"
                className="logout-btn"
                onClick={this.logout}
              >
                Logout
              </button>
            </li>
            <li className="hamburger" onClick={this.openMenu}>
              <GiHamburgerMenu />
            </li>
          </ul>
        </nav>
        {openMenu && (
          <ul className="mobile-menu">
            <li className="nav-item2">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item3">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={this.logout}
              >
                Logout
              </button>
            </li>
            <li className="close-btn" onClick={this.closeMenu}>
              <RiCloseCircleFill style={{fontSize: '20px'}} />
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(NavBar)
