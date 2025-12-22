import Banner from "../../components/Home/Banner/Banner";
import Faq from "../../components/Home/FAQ/Faq";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import LatestBooks from "../../components/Home/LatestBooks/LatestBooks";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestBooks />
      <HowItWorks />
      <Faq />
    </div>
  );
};

export default Home;
