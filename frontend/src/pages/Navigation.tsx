import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="landingpagediv bg-background">
      <div className="insideLanding">
        <nav className="nav">
          <img
            width={40}
            height={40}
            src="/logo.jpg"
            alt="Hamro Restaurant Logo"
            className="w-20 h-20 ml-3"
          />
          <ul className="flex space-x-4 m-3">
            <li className="li ">
              <Link to="/menue">Menue</Link>
            </li>
            <li className="li">
              <Link to="/login">Login</Link>
            </li>
            <li className="li">
              <Link to="/order">Online Order</Link>
            </li>
            <li className="li">
              <Link to="/reservation">Reservation</Link>
            </li>
            <li className="li">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
