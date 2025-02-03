import { Link } from "react-router-dom";
import "../pages/mycss.css";

const Navigation = () => {
  return (
    <div className="landingpagediv">
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
            <li className="li relative group">
              <span className="flex items-center cursor-pointer">Menue</span>
              <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1">
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/menu?type=lunch">Lunch</Link>
                </li>
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/menu?type=breakfast">Breakfast</Link>
                </li>
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/menu?type=dinner">Dinner</Link>
                </li>
              </ul>
            </li>
            <li className="li">
              <Link to="/login">Login</Link>
            </li>
            <li className="li">
              <Link to="/menu">Online Order</Link>
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
