import React from 'react'
import '../CSS/footer.css'

export default function Footer() {
  return (
    <>
      <footer>
        <h2>Movie App</h2>
        <div className="abtus">
          <h3>About Us</h3>
          <p>Movie App is a Platform to discover and explore movies.</p>
          <p>We provide information about popular movies, top-rated films, and allow users to search for their favorite movies.</p>
        </div>
        <div className="contact">
          <h3>Contact Us</h3>
          <p>Have questions? Reach out to us!</p>
          <p>Email: info@movieapp.com</p>
          <p>Phone: +91 112233445566</p>
        </div>
      </footer>
    </>
  )
}
