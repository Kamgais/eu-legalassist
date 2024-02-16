import SelectLanguageBox from '@/shared/languageBox/SelectLanguageBox';
import classes from './topBar.module.scss';
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from 'next/image';


export default function TopBar() {
  return (
   <nav className={classes.topBar}>
    <div className={classes.topBar_head}>
      <div className={classes.topBar_head_location}>
        <p>Location: Vorsetzen 41, 20459 Hamburg</p>
      </div>
      <div className={classes.topBar_head_email}>
        <p>Email: company@legalassist.de</p>
      </div>
      <div className={classes.topBar_head_actions}>
        <div className={classes.topBar_head_actions_social}>
          <FaTwitter/>
        </div>
        <div className={classes.topBar_head_actions_social}>
          <FaInstagram/>
        </div>
          <SelectLanguageBox/>
      </div>
    </div>
    <div className={classes.topBar_body}>
      <div className={classes.topBar_body_logo}>
       <Image  src='/images/appLogo.png' width={260} height={60} alt=''/>
        <div className={classes.topBar_body_logo_burger_menu}>
        <RxHamburgerMenu />
        </div>

      </div>
      <div className={classes.topBar_body_contacts}>
          <div className={classes.topBar_body_contacts_number}>
             <p>Problem? Contact us</p>
             <p>+490175 8886316</p>
          </div>
          <div className={classes.topBar_body_contacts_hours}>
            <p>Call Hours</p>
            <p>MON-FRI 09H-12H</p>
          </div>
      </div>
    </div>
    <div className={classes.topBar_actions}>
      <ul className={classes.topBar_actions_left}>
        <li>Home</li>
        <li>Business & Unternehmen</li>
        <li>Personalwesen / Arbeit</li>
        <li>Rechtsdokumente</li>
        <li>Alle Dokumente</li>
      </ul>
      <div className={classes.topBar_actions_right}>
        <div className={classes.topBar_actions_search}>
          <input type="text" placeholder='Search' />
          <div className={classes.topBar_actions_search_icon}>
          <CiSearch/>
          </div>
        </div>
        <button>Login</button>
        <button>Register Now</button>
      </div>
    </div>
   </nav>
  )
}
