
import classes from './howItWorkStep.module.scss';

type Props = {
  stepIndex: number,
  action: string;
  description: string;
}

export default function HowItWorkStep({stepIndex, action, description}: Props) {
  return (
    <div className={classes.howItWorkStep_container}>
      <div className={classes.howItWorkStep_index}>{stepIndex}</div>
      <div className={classes.howItWorkStep_right}>
      <div className={classes.howItWorkStep_action}>{action}</div>
      <div className={classes.howItWorkStep_desc}>{description}</div>
      </div>

    </div>
  )
}
