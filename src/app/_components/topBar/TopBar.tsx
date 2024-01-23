import SelectLanguageBox from '@/shared/languageBox/SelectLanguageBox';
import classes from './topBar.module.scss';
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";


export default function TopBar() {
  return (
   <nav className={classes.topBar}>
    <div className={classes.topBar_head}>
      <div className={classes.topBar_head_location}>
        <p>Location: youadressestraße 12, 12457 Berlin</p>
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
          LOGO
      </div>
      <div className={classes.topBar_body_contacts}>
          <div className={classes.topBar_body_contacts_number}>
             <p>Problem? Contact us</p>
             <p>+55555 555 555</p>
          </div>
          <div className={classes.topBar_body_contacts_hours}>
            <p>Call Hours</p>
            <p>MON-FRI 09H-12H</p>
          </div>
      </div>
    </div>
    <div className={classes.topBar_actions}>
      <ul className={classes.topBar_actions_left}>
        <li>HOME</li>
        <li>CAT A</li>
        <li>CAT B</li>
        <li>CAT C</li>
        <li>CAT D</li>
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
