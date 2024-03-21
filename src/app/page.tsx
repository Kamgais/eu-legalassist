import AboutUs from "./_components/AboutUs/AboutUs";
import HowItWorks from "./_components/howItWorks/HowItWorks";
import LandingCover from "./_components/landingCover/LandingCover";
import MostUsedCases from "./_components/mostUsedCases/MostUsedCases";
import ServiceOffer from "./_components/serviceOffer/serviceOffer";
import YourCaseSearch from "./_components/yourCaseSearch/YourCaseSearch";
import classes from "./page.module.scss";

export default function Home() {
  return (
   <>
   <LandingCover/>
   <ServiceOffer/>
   <AboutUs/>
   </>
  );
}
