import { Link } from "react-router-dom";
import "./../../pagescss/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Home </Link>
        </li>
        <li>
          <Link to="/admin/inventory">Inventory </Link>
        </li>
        <li>
          <Link to="/admin/mydata">MyData </Link>
        </li>
        <li>
          <Link to="/admin/products">Products </Link>
        </li>
        <li>
          <Link to="/admin/student">Student </Link>
        </li>
        <li>
          <Link to="/admin/pdf">Pdf file </Link>
        </li>
        <li>
          <Link to="/admin/book-pdf">Book Pdf file </Link>
        </li>
        <li>
          <Link to="/admin/users">Users </Link>
        </li>
         <li>
          <Link to="/admin/class-video">Class video </Link>
        </li>
        <li>
          <Link to="/">Page </Link>
        </li>



      </ul>
    </nav>
  );
};

export default Navbar;