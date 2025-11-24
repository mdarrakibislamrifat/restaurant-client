import BreakfastMenu from "../components/BreakfastMenu";
import CustomerFeedback from "../components/CustomerFeedback";
import DishSeller from "../components/DishSeller";
import Footer from "../components/Footer";
import Partner from "../components/Partner";
import TeamMembers from "../components/TeamMembers";

const HomePage = () => {
  return (
    <div>
      <BreakfastMenu />
      <DishSeller />
      <CustomerFeedback />
      <TeamMembers />
      <Partner />
      <Footer />
    </div>
  );
};

export default HomePage;
