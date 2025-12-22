import { Link } from "react-router";
import bookLogoWhite from "../../assets/Book Courier Logo (200 x 200 px).png";

const LogoWhite = ({ className }) => {
  return (
    <div>
      <Link to={"/"}>
        <img
          src={bookLogoWhite}
          alt="Book Courier Logo"
          className={className || "w-30"}
        />
      </Link>
    </div>
  );
};

export default LogoWhite;
