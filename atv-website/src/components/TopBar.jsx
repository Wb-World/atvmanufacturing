export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+914447418989">+91 44-4741-8989</a>
            </span>
            <span className="top-bar-item">
              <i className="fas fa-mobile-alt"></i>
              <a href="tel:+919841028167">+91-98410-28167</a>
            </span>
            <span className="top-bar-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:info@atvmanufacturing.com">info@atvmanufacturing.com</a>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item">
              <i className="fas fa-map-marker-alt"></i>
              Maraimalai Nagar, Tamil Nadu, India
            </span>
            <span className="top-bar-item">
              <i className="fas fa-clock"></i>
              Mon–Sat: 9:00 AM – 6:00 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
