"use client";

import classes from './form.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const steps = [
  {
    id: '1' ,
    name: 'Personal Infos'
  },
  {
    id: '2',
    name: 'Angabe zum Studium'
  },
  {
    id: '3',
    name: 'Ausdrücken'
  }
]


type Document = {
  // kindergeldberechtigten Person
  familienname: string,
  vorname: string,
  kindergeldNr: string,
  telefonische: string

  // Angaben zum Kind
  kindFamilienname: string,
  kindVorname: string,
  geburtsdatum: string,

  // Angaben zum Studium
  uniBeendet: boolean,
  uniBestaetigungAb: string,
  uniDokumentAm: string,
  uniNachweis: string

  uniAbgebrochen: boolean,
  uniAbgebrochenAm: string,

  uniGehtWeiter: boolean,
  uniDauerBis: string,

  // Wintersemester
  immaWise: boolean,
  immaWiseJahr: number,

  // Sommersemester
  immaSoSe: boolean,
  immaSoSeJahr: number,

  beigefuegt: boolean,
  wirdNachgereicht: boolean,

  extraAngaben: string
}

export default function Form() {
  const  [currentStep, setCurrentStep] = useState(0);
  const [immaJahr, setImmaJahr] = useState(0);
  const [document , setDocument] = useState<Document>({
      familienname: '',
      vorname: '',
      kindergeldNr: '',
      telefonische: '',

      kindFamilienname: '',
      kindVorname: '',
      geburtsdatum: '',

      uniBeendet: false,
      uniBestaetigungAb: '',
      uniDokumentAm: '',
      uniNachweis: '',

      uniAbgebrochen: false,
      uniAbgebrochenAm: '',

      uniGehtWeiter: false,
      uniDauerBis: '',

      immaWise: false,
      immaWiseJahr: 0,

      immaSoSe: false,
      immaSoSeJahr: 0,

      beigefuegt: false,
      wirdNachgereicht: false,

      extraAngaben: '',
    })
  const router = useRouter();

  const goToNextStep = () => {
    setCurrentStep(currentStep => currentStep+1)
  }

  const goToPrevStep = () => {
    if(currentStep === 0) {
      router.push('/');
    }
    else {
      setCurrentStep(currentStep => currentStep-1)
    }

  }

  const formatDate = (date: any) => {
    if(date === "") {
      return date;
    }
    var parts = date.split('-');
    var formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
    return formattedDate;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newDocument;
    if(e.currentTarget.type == 'date') {
      console.log(e.currentTarget.value)
      newDocument = {...document , [e.currentTarget.name]: e.currentTarget.value };
    } else {
      newDocument = {...document , [e.currentTarget.name]: e.currentTarget.value};
    }

   setDocument(newDocument);

  }


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const immaType = e.currentTarget.value;

    switch(immaType) {
      case 'WiSe':  {
        const newDocument: Document = {...document , immaWise: true , immaSoSe: false ,  immaWiseJahr: immaJahr , immaSoSeJahr: 0}
        setDocument(newDocument);
      }
      case 'SoSe' : {
        const newDocument = {...document , immaWise: false , immaSoSe: true,  immaWiseJahr: 0 , immaSoSeJahr: immaJahr}
        setDocument(newDocument);
      }
      default : {
        const newDocument = {...document , immaWise: false , immaSoSe: false,  immaWiseJahr: 0 , immaSoSeJahr: 0}
        setDocument(newDocument);
      }
      }
  }

  const handleSubmit = async() => {

    const newDocument: Document = {
      ...document,
      geburtsdatum: formatDate(document.geburtsdatum),
      uniBestaetigungAb: formatDate(document.uniBestaetigungAb),
      uniDokumentAm: formatDate(document.uniDokumentAm),
      uniAbgebrochenAm: formatDate(document.uniAbgebrochenAm),
      uniDauerBis: formatDate(document.uniDauerBis)

    }
    console.log(newDocument)
    const response = await fetch('http://localhost:8082/eulegalassist/api/generatePdfHtml', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDocument)
    })
    const data = await response.json();
    console.log(data);
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
      <form action="#" className={classes.form_container_form}>
          {
            currentStep === 0 && <h3>Please provide the following details of the child benefit entitled person</h3>
          }
          {
            currentStep === 1 && <h3>Angaben zum Kind</h3>
          }

          {
           currentStep === 2 && <h3>Angaben zum Studium</h3>
          }
        {
          currentStep === 0 && (
            <div className={classes.form_container_step_box}>
           <div className={classes.form_container_step_zero}>
              <label htmlFor="">First Name</label>
              <input type="text" name='familienname' placeholder='Firstname' value={document.familienname} onChange={handleInputChange} />
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">Last Name</label>
              <input type="text" placeholder='Lastname' name='vorname' value={document.vorname} onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">A phone number under which you can be reached for inquiries</label>
              <input type="text" placeholder='Lastname' name='telefonische' value={document.telefonische}  onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">Child Benefit Reference Number</label>
              <input type="text" placeholder='Lastname' name='kindergeldNr' value={document.kindergeldNr} onChange={handleInputChange} />
           </div>

           </div>
          )
        }

        {
          currentStep === 1 && (
            <div className={classes.form_container_step_box}>
            <div className={classes.form_container_step_one}>
              <label htmlFor="">First Name</label>
              <input type="text" name='kindFamilienname' placeholder='Firstname' value={document.kindFamilienname} onChange={handleInputChange} />
           </div>

           <div className={classes.form_container_step_one}>
              <label htmlFor="">Last Name</label>
              <input type="text" placeholder='Lastname' name='kindVorname' value={document.kindVorname} onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_one}>
              <label htmlFor="">Date of Birth</label>
              <input type="date"  name='geburtsdatum' value={document.geburtsdatum} onChange={handleInputChange} />
           </div>
            </div>
          )
        }


{
          currentStep === 2 && (
            <>
            <div className={classes.form_container_step_two_box}>
             <div className={classes.form_container_step_two}>
              <div className={classes.form_container_step_two_checkbox}>
                <input type="checkbox" name="" id=""  onChange={(e) => setDocument({...document, uniBeendet: e.currentTarget.checked}) } />
                <label htmlFor="">Completed</label>
              </div>
              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color: document.uniBeendet ? '#23578D' : '#23568dbe'
                  }
                }>When can you download your proof of certificate and results from your university online portal?</label>
                <input type="date"  placeholder='dd/mm/yyyy' disabled={!document.uniBeendet} name='uniBestaetigungAb' value={document.uniBestaetigungAb} onChange={handleInputChange}/>
              </div>
              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color: document.uniBeendet ? '#23578D' : '#23568dbe'
                  }
                }>Provide the date the official written notification of the final result was received.</label>
                <input type="date"  placeholder='dd/mm/yyyy' disabled={!document.uniBeendet} name='uniDokumentAm' value={document.uniDokumentAm} onChange={handleInputChange}/>
              </div>
              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color: document.uniBeendet ? '#23578D' : '#23568dbe'
                  }
                }>Which attachments are you adding to this application as proof of end of studies?</label>
                <input type="text"  placeholder='Answer here' disabled={!document.uniBeendet} name='uniNachweis' value={document.uniNachweis} onChange={handleInputChange}/>
              </div>
             </div>
             <div className={classes.form_container_step_two}>
              <div className={classes.form_container_step_two_checkbox}>
                <input type="checkbox" name="" id="" onChange={(e) => setDocument({...document, uniAbgebrochen: e.currentTarget.checked}) }/>
                <label htmlFor="">Dropped out</label>
              </div>
              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color: document.uniAbgebrochen ? '#23578D' : '#23568dbe'
                  }
                }>When did you drop out?</label>
                <input type="date" name="uniAbgebrochenAm" id=""  disabled={!document.uniAbgebrochen} value={document.uniAbgebrochenAm} onChange={handleInputChange} />
              </div>
             </div>
             <div className={classes.form_container_step_two}>
             <div className={classes.form_container_step_two_checkbox}>
                <input type="checkbox" name="" id="" onChange={(e) => setDocument({...document, uniGehtWeiter: e.currentTarget.checked}) } />
                <label htmlFor="">Currently studying</label>
              </div>
              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color: document.uniGehtWeiter ? '#23578D' : '#23568dbe'
                  }
                }>Which enrollment certificate can you provide ?</label>
                <select name="immaType" id="" disabled={!document.uniGehtWeiter} onChange={handleSelectChange}>
                  <option value="WiSe">Wintersemester</option>
                  <option value="SoSe">Sommersemester</option>
                </select>
              </div>

              <div className={classes.form_container_step_two_date}>
                <label htmlFor="" style={
                  {
                    color:  document.uniGehtWeiter ? '#23578D' : '#23568dbe'
                  }
                }>Year</label>
                <input type="number"  placeholder='yyyy' disabled={!document.uniGehtWeiter} value={immaJahr} onChange={(e) => setImmaJahr(Number(e.currentTarget.value)) } />
              </div>
              <div className={classes.form_container_step_two_radio}>
              <input type="checkbox" name="beigefuegt" id="" onChange={(e) => setDocument({...document, beigefuegt: e.currentTarget.checked}) } />
                <label htmlFor="">I have included the enrollment certificate in this application</label>
              </div>

              <div className={classes.form_container_step_two_radio}>
              <input type="checkbox" name="wirdNachgereicht" id="" onChange={(e) => setDocument({...document, wirdNachgereicht: e.currentTarget.checked})}/>
                <label htmlFor="">I will provide the enrollment certificate later</label>
              </div>


              <div className={classes.form_container_step_two_textarea}>
                <label htmlFor="">Do you have any further information you would like to provide?</label>
                <textarea name="extraAngaben" id="" cols={30} rows={10} onChange={handleInputChange}></textarea>
              </div>

              <div className={classes.form_container_step_two_confirm}>
                <label htmlFor="">By checking the box below, you assure that your information is complete and true.
                 You are also assuring that you are aware that you must immediately inform the family fund (Familienkasse)
                 of any changes that are important for the entitlement to child benefit. You have taken note of the content
                 of the child benefit leaflet (can be found at www.bzst.de or www.familienkasse.de).</label>

                  <div>
                  <input type="radio" name="confirmed" id="" />
                  <label htmlFor="">Yes</label>
                  </div>

                  <div>
                  <input type="radio" name="confirmed" id="" />
                  <label htmlFor="">No</label>
                  </div>
              </div>


             </div>
            </div>

            </>
          )
        }
      </form>
       {/* actions */}
       <div className={classes.form_container_actions}>
          <button onClick={goToPrevStep}>{
            currentStep === 0  ? 'Abbrechen' :'Zurück'
          }</button>
          <button onClick={currentStep === 2 ? handleSubmit : goToNextStep}>
            {
              currentStep === 2 ? 'Einreichen' : 'Weiter'
            }
          </button>
        </div>
    </section>
  )
}
