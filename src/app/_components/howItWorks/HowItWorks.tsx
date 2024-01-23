import TitleWithBar from '@/shared/titleWithBar/TitleWithBar'
import classes from './howItWorks.module.scss'
import { Step, steps } from '@/constants/steps'
import HowItWorkStep from '@/shared/howItWorkStep/HowItWorkStep'

export default function HowItWorks() {
  return (
    <div className={classes.howItWorks_container}>
      <TitleWithBar title='How It Works'/>

      <div className={classes.howItWorks_stepList} style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          steps.map((step: Step, index: number) => (
            <HowItWorkStep key={index} stepIndex={step.stepIndex} action={step.action} description={step.description}/>
          ))
        }
      </div>
    </div>
  )
}
