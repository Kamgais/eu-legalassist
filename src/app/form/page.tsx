"use client";

import classes from './form.module.scss';
import { useState } from 'react';

const steps = [
  {
    id: '1' ,
    name: 'Personal Infos'
  },
  {
    id: '2',
    name: 'Angabe zur Bescheinigung'
  },
  {
    id: '3',
    name: 'Ausdrücken'
  }
]

export default function Form() {
  const  [currentStep, setCurrentStep] = useState(0);

  const handleClick = () => {
    setCurrentStep(currentStep => currentStep+1)
  }
  return (
    <section className={classes.form_container}>
      {/* steps */}
      <nav className={classes.form_nav}>
        <ul className={classes.form_nav_ul}>
          {
            steps.map((step, index) => (
              <li key={index}>{step.name}</li>
            ))
          }
        </ul>
      </nav>

      {/* Form */}
      <form action="#">
        {
          currentStep === 0 && (
            <>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Familienname*</label>
              <input type="text" placeholder='Familienname' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Vorname*</label>
              <input type="text" placeholder='Vorname' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Geburtsdatum</label>
              <input type="date" placeholder='dd/mm/jjjj' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Anschrift</label>
              <input type="text" placeholder='Straße/Platz' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Hausnummer</label>
              <input type="text" placeholder='Hausnummer' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">PLZ</label>
              <input type="text" placeholder='PLZ' />
            </div>
            <div className={classes.form_container_step_zero}>
              <label htmlFor="">Stadt</label>
              <input type="text" placeholder='Stadt' />
            </div>
            </>
          )
        }

        {
          currentStep === 1 && (
            <>
            <p className={classes.form_container_step_two}>Ich beantrage die Austellung einer Bescheiningung für das Pfändungsschutzkonto :</p>
            <input type="radio" /> <label htmlFor="">Über das zu zahlenden Kindergeld</label>
            <input type="radio" /> <label htmlFor="">Über den zu zahlenden Kinderzuschlag</label>
            <input type="radio" /> <label htmlFor="">Ich bekomme das Kindergeld auf mein eigenes Konto überwiesen</label>
            <input type="radio" /> <label htmlFor="">Mein Kindergeld wird auf das Konto einer anderen Person überwiesen</label>
            </>
          )
        }


{
          currentStep === 2 && (
            <>
            <p>Die Bescheinigung wird benötigt für :</p>
            <input type="radio" /> <label htmlFor="">die Person,welche </label>
            <input type="radio" /> <label htmlFor="">Kindergeld</label>
            <input type="radio" /> <label htmlFor="">Kinderzuschlag beantragt hat</label>
            <input type="radio" /> <label htmlFor="">das, Kind welches das Kindergeld direkt abgezweigt und ausgezahlt bekommt</label>
            </>
          )
        }

        {
          currentStep === 3 && (
            <>
             <div>
              <label htmlFor="">Familienname</label>
              <input type="text" placeholder='Familienname' />
            </div>
            <div>
              <label htmlFor="">Anschrift der zuständige Familienkasse</label>
              <input type="text" placeholder='Anschrift' />
            </div>
            </>
          )
        }


      </form>
       {/* actions */}
       <div className={classes.form_container_actions}>
          <button>Züruck</button>
          <button onClick={handleClick}>Weiter</button>
        </div>
    </section>
  )
}
