import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo-text">Hiroshima Local Guide</div>
            <p className="footer__tagline">
              Real recommendations from people who live and eat here every day.
            </p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <div className="footer__col-title">Explore</div>
              <Link to="/restaurants">All Restaurants</Link>
              <Link to="/quiz">Find My Match</Link>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Categories</div>
              <Link to="/restaurants">Seafood</Link>
              <Link to="/restaurants">Okonomiyaki</Link>
              <Link to="/restaurants">Ramen</Link>
              <Link to="/restaurants">Izakaya</Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          © {new Date().getFullYear()} Hiroshima Local Guide — Not sponsored. Not a tourist trap.
        </div>
      </div>
    </footer>
  )
}
