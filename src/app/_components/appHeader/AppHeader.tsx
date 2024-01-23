import classes from './appHeader.module.scss';
import TopBar from '../topBar/TopBar';
import HeadContent from '../headContent/HeadContent';

export default function AppHeader() {
  return (
   <header className={classes.appHeader_container}>
      <TopBar/>
      <HeadContent/>
   </header>
  )
}
