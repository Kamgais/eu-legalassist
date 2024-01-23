import classes from './titleWithBar.module.scss';



type Props = {
  title: string;
}

export default function TitleWithBar({title}: Props) {
  return (
    <div className={classes.yourCaseSearch_title}>
    <h2>{title}</h2>
    <div className={classes.yourCaseSearch_title_bar}></div>
  </div>
  )
}
