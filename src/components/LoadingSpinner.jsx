import { HashLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <HashLoader size={100} color="#3b82f6" />
    </div>
  );
};

export default LoadingSpinner;
