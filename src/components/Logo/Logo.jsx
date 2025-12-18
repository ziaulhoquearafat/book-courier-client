import { Link } from "react-router";
import bookLogo from "../../assets/Book Courier Logo.png";

const Logo = ({ className }) => {
  return (
    <div>
      <Link to={"/"}>
        <img
          src={bookLogo}
          alt="Book Courier Logo"
          className={className || "w-30"}
        />
      </Link>
    </div>
  );
};

export default Logo;
