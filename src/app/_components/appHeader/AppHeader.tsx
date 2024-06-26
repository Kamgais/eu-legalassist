import classes from './appHeader.module.scss';
import TopBar from '../topBar/TopBar';
import LandingCover from '../landingCover/LandingCover';

export default function AppHeader() {
  return (
   <header className={classes.appHeader_container}>
      <TopBar/>
   </header>
  )
}
