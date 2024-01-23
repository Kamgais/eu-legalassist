import TitleWithBar from '@/shared/titleWithBar/TitleWithBar';
import classes from './mostUsedCases.module.scss';
import { UsedCase, mostUsedCases } from '@/constants/mostUsedCases';
import MostUsedCase from '@/shared/mostUsedCase/MostUsedCase';
import { FaArrowRight } from "react-icons/fa6";

export default function MostUsedCases() {
  return (
    <div className={classes.mostUsedCases_container}>
      <TitleWithBar title='Most used Cases and Documents'/>
      <div className={classes.mostUsedCases_list}>
        {
          mostUsedCases.map((usedCase: UsedCase, index: number) => (
            <MostUsedCase key={index} title={usedCase.title} cases={usedCase.cases}/>
          ))
        }
      </div>

      <button className={classes.mostUsedCases_button}>More cases <FaArrowRight/> </button>

    </div>
  )
}
