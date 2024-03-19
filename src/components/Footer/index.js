/* eslint-disable react/no-unknown-property */
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import {Component} from 'react'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-cont">
        <img
          src="https://res.cloudinary.com/digbzwlfx/image/upload/v1704129774/Group_7420_q9ka5q.svg"
          alt="website-footer-logo"
        />
        <h1 className="footer-head1">Tasty Kitchen</h1>
      </div>

      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-icons">
        <FaPinterestSquare className="icon" testid="pintrest-social-icon" />
        <FaInstagram className="icon" testid="instagram-social-icon" />
        <FaTwitter className="icon" testid="twitter-social-icon" />
        <FaFacebookSquare className="icon" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
