import HowItWorks from "./_components/howItWorks/HowItWorks";
import LandingCover from "./_components/landingCover/LandingCover";
import MostUsedCases from "./_components/mostUsedCases/MostUsedCases";
import YourCaseSearch from "./_components/yourCaseSearch/YourCaseSearch";
import classes from "./page.module.scss";

export default function Home() {
  return (
   <>
   <LandingCover/>
   <YourCaseSearch/>
   <HowItWorks/>
   <MostUsedCases/>
   </>
  );
}
