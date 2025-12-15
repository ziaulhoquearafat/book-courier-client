import { Link } from "react-router";
import bookLogo from "../../assets/Book Courier Logo.png";

const Logo = () => {
  return (
    <div>
      <Link>
        <img src={bookLogo} alt="Book Courier Logo" className="w-30 h-30" />
      </Link>
    </div>
  );
};

export default Logo;
