import classes from './footer.module.scss';

export default function Footer() {
  return (
   <div className={classes.footer_container}>
    <div className={classes.footer_welcome}>
      <h2>Welcome to EU Legal Assist</h2>
      <p>German legal documents in English and French for every immigrant.
        Understand your rights and declare your taxes without language barriers.</p>
         {/* <p>corrupti optio sapiente quisquam sint doloribus,
         aque dolores voluptat!</p> */}
       <div>
        <div></div>
        <div></div>
       </div>
    </div>
    <div className={classes.footer_company}>
      <h2>Company</h2>
      <ul>
        <li>About us</li>
        <li>Documents</li>
        <li>Cases</li>
        <li>FAQ</li>
      </ul>
    </div>
    <div className={classes.footer_contact}>
      <h2>Contact Details</h2>
      <div>
        <h3>Adresse</h3>
        <p>Vorsetzen 41, 20459 Hamburg</p>
      </div>
      <div>
        <h3>Open Hours</h3>
        <p>Mon - Fri: 09h - 19h</p>
      </div>

      <div>
        <h3>Telephone</h3>
        <p>+490175 8886316</p>
      </div>
    </div>
    <div className={classes.footer_other}>
      <h2>Other</h2>
      <ul>
        <li>Impressum</li>
        <li>AGB</li>
        <li>Privacy policy</li>
        <li>Cookie policy</li>
      </ul>
    </div>
   </div>
  )
}
