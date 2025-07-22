import { Link } from "react-router-dom";
import "./../../pagescss/Navbar.css"; 

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home </Link>
        </li>
        <li>
          <Link to="/login">Login </Link>
        </li>
        <li>
          <Link to="/signup">Signup </Link>
        </li>
         <li>
          <Link to="/pdf-viewer">Pdf </Link>
        </li>
        <li>
          <Link to="/admin">Admin </Link>
        </li>
         


      </ul>
    </nav>
  );
};

export default Navbar;