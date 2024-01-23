import Footer from "./_components/footer/Footer";
import HowItWorks from "./_components/howItWorks/HowItWorks";
import MostUsedCases from "./_components/mostUsedCases/MostUsedCases";
import YourCaseSearch from "./_components/yourCaseSearch/YourCaseSearch";
import classes from "./page.module.scss";

export default function Home() {
  return (
   <>
   <YourCaseSearch/>
   <HowItWorks/>
   <MostUsedCases/>
   </>
  );
}
