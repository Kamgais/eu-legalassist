"use client";

import classes from './form.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '@/shared/loadingSpinner/loadingSpinner';

const steps = [
  {
    id: '1' ,
    name: 'Personal Infos'
  },
  {
    id: '2',
    name: 'Informations about study'
  },
  {
    id: '3',
    name: 'Print'
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
  const [loading,setLoading] = useState(false);
  const [uniLevel , uniLevelSet] = useState('');
  const [documentPdf , setDocumentPdf] = useState<Document>({
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
      newDocument = {...documentPdf , [e.currentTarget.name]: e.currentTarget.value };
    } else {
      newDocument = {...documentPdf , [e.currentTarget.name]: e.currentTarget.value};
    }

   setDocumentPdf(newDocument);

  }


  const setImmatype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const immaType = e.currentTarget.value;

    switch(immaType) {
      case 'WiSe':  {
        const newDocument: Document = {...documentPdf , immaWise: true , immaSoSe: false ,  immaWiseJahr: immaJahr , immaSoSeJahr: 0}
        setDocumentPdf(newDocument);
        break;
      }
      case 'SoSe' : {
        const newDocument = {...documentPdf , immaWise: false , immaSoSe: true,  immaWiseJahr: 0 , immaSoSeJahr: immaJahr}
        setDocumentPdf(newDocument);
        break;
      }
      default : {
        const newDocument = {...documentPdf , immaWise: false , immaSoSe: false,  immaWiseJahr: 0 , immaSoSeJahr: 0}
        setDocumentPdf(newDocument);
        break;
      }
      }
  }

  const setUniLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uniLevel = e.currentTarget.value;
    switch(uniLevel) {
      case 'completed':  {
        const newDocument: Document = {...documentPdf , uniBeendet: true , uniGehtWeiter: false , uniAbgebrochen: false}
        setDocumentPdf(newDocument);
        uniLevelSet('completed')
        break;
      }
      case 'droppedOut' : {
        const newDocument = {...documentPdf , uniBeendet: false , uniGehtWeiter: false , uniAbgebrochen: true}
        setDocumentPdf(newDocument);
        uniLevelSet('droppedOut')
        break;
      }

      case 'uniGehtWeiter' :  {
        const newDocument = {...documentPdf , uniBeendet: false , uniGehtWeiter: true , uniAbgebrochen: false}
        setDocumentPdf(newDocument);
        uniLevelSet('uniGehtWeiter')
        break;
      }
      default : {
        const newDocument = {...documentPdf , uniBeendet: true , uniGehtWeiter: false , uniAbgebrochen: false}
        setDocumentPdf(newDocument);
        uniLevelSet('completed')
      }
      }
  }

  const handleSubmit = async() => {

    const newDocument: Document= {
      ...documentPdf,
      geburtsdatum: formatDate(documentPdf.geburtsdatum),
      uniBestaetigungAb: formatDate(documentPdf.uniBestaetigungAb),
      uniDokumentAm: formatDate(documentPdf.uniDokumentAm),
      uniAbgebrochenAm: formatDate(documentPdf.uniAbgebrochenAm),
      uniDauerBis: formatDate(documentPdf.uniDauerBis)

    }
    console.log(newDocument)
    setLoading(true);
    const response = await fetch('http://localhost:8082/eulegalassist/api/generatePdfHtml', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDocument)
    })
    console.log(response)
    // const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      setLoading(false);
      throw new Error('Failed to generate PDF');
    }
    const pdfBlob = await response.blob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `${Math.random() * 1000}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    setLoading(false);

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
            currentStep === 1 && <h3>Infos about Kid</h3>
          }

          {
           currentStep === 3 && <h3>Infos about study</h3>
          }
        {
          currentStep === 0 && (
            <div className={classes.form_container_step_box}>
           <div className={classes.form_container_step_zero}>
              <label htmlFor="">First Name*</label>
              <input type="text" name='familienname' placeholder='Firstname' value={documentPdf.familienname} onChange={handleInputChange} />
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">Last Name*</label>
              <input type="text" placeholder='Lastname' name='vorname' value={documentPdf.vorname} onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">Phone number*</label>
              <input type="text" placeholder='Number' name='telefonische' value={documentPdf.telefonische}  onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_zero}>
              <label htmlFor="">Child Benefit Reference Number</label>
              <input type="text" placeholder='kindergeldNr' name='kindergeldNr' value={documentPdf.kindergeldNr} onChange={handleInputChange} />
           </div>

           </div>
          )
        }

        {
          currentStep === 1 && (
            <div className={classes.form_container_step_box}>
            <div className={classes.form_container_step_one}>
              <label htmlFor="">First Name*</label>
              <input type="text" name='kindFamilienname' placeholder='Firstname' value={documentPdf.kindFamilienname} onChange={handleInputChange} />
           </div>

           <div className={classes.form_container_step_one}>
              <label htmlFor="">Last Name*</label>
              <input type="text" placeholder='Lastname' name='kindVorname' value={documentPdf.kindVorname} onChange={handleInputChange}/>
           </div>

           <div className={classes.form_container_step_one}>
              <label htmlFor="">Date of Birth*</label>
              <input type="date"  name='geburtsdatum' value={documentPdf.geburtsdatum} onChange={handleInputChange} />
           </div>
            </div>
          )
        }



        {
          currentStep === 2 && (
            <>
            <div className={classes.form_container_step_two_box}>
              <label htmlFor="">Lorem ipsum dolor sit amet</label>
              <select name="uniLevel" id="" value={uniLevel}  onChange={setUniLevel}>
                <option value="">Choose an option</option>
                <option value="completed">completed</option>
                <option value="droppedOut">dropped out</option>
                <option value="uniGehtWeiter">currently studying</option>
              </select>
            </div>
            </>
          )
        }


{
          currentStep === 3 && (
            <>
            <div className={classes.form_container_step_three_box}>
            {
              documentPdf.uniBeendet && (
                <div className={classes.form_container_step_three}>
                <div className={classes.form_container_step_three_checkbox}>
                  <h3>Completed</h3>
                </div>
                <div className={classes.form_container_step_three_date}>
                  <label htmlFor="" >When can you download your proof of certificate and results from your university online portal?</label>
                  <input type="date"  placeholder='dd/mm/yyyy' disabled={!documentPdf.uniBeendet} name='uniBestaetigungAb' value={documentPdf.uniBestaetigungAb} onChange={handleInputChange}/>
                </div>
                <div className={classes.form_container_step_three_date}>
                  <label htmlFor="">Provide the date the official written notification of the final result was received.</label>
                  <input type="date"  placeholder='dd/mm/yyyy' disabled={!documentPdf.uniBeendet} name='uniDokumentAm' value={documentPdf.uniDokumentAm} onChange={handleInputChange}/>
                </div>
                <div className={classes.form_container_step_three_date}>
                  <label htmlFor="">Which attachments are you adding to this application as proof of end of studies?</label>
                  <input type="text"  placeholder='Answer here' disabled={!documentPdf.uniBeendet} name='uniNachweis' value={documentPdf.uniNachweis} onChange={handleInputChange}/>
                </div>
               </div>
              )
            }

             {
              documentPdf.uniAbgebrochen && (
                <div className={classes.form_container_step_three}>
                <div className={classes.form_container_step_two_checkbox}>
                  <h3>Dropped out</h3>
                </div>
                <div className={classes.form_container_step_three_date}>
                  <label htmlFor="">When did you drop out?</label>
                  <input type="date" name="uniAbgebrochenAm" id=""  disabled={!documentPdf.uniAbgebrochen} value={documentPdf.uniAbgebrochenAm} onChange={handleInputChange} />
                </div>
               </div>
              )
             }
              {
                documentPdf.uniGehtWeiter && (
                  <div className={classes.form_container_step_three}>
                  <div className={classes.form_container_step_three_checkbox}>
                     <h3>Currently studying</h3>
                   </div>
                   <div className={classes.form_container_step_three_date}>
                     <label htmlFor="">Which enrollment certificate can you provide ?</label>
                     <select name="immaType" id="" disabled={!documentPdf.uniGehtWeiter} onChange={setImmatype}>
                       <option value="WiSe">Wintersemester</option>
                       <option value="SoSe">Sommersemester</option>
                     </select>
                   </div>

                   <div className={classes.form_container_step_three_date}>
                     <label htmlFor="">Year</label>
                     <input type="number"  placeholder='yyyy' disabled={!documentPdf.uniGehtWeiter} value={immaJahr} onChange={(e) => setImmaJahr(Number(e.currentTarget.value)) } />
                   </div>
                   <div className={classes.form_container_step_three_radio}>
                   <input type="checkbox" name="beigefuegt" id="" onChange={(e) => setDocumentPdf({...documentPdf, beigefuegt: e.currentTarget.checked}) } />
                     <label htmlFor="">I have included the enrollment certificate in this application</label>
                   </div>

                   <div className={classes.form_container_step_three_radio}>
                   <input type="checkbox" name="wirdNachgereicht" id="" onChange={(e) => setDocumentPdf({...documentPdf, wirdNachgereicht: e.currentTarget.checked})}/>
                     <label htmlFor="">I will provide the enrollment certificate later</label>
                   </div>


                   <div className={classes.form_container_step_three_textarea}>
                     <label htmlFor="">Do you have any further information you would like to provide?</label>
                     <textarea name="extraAngaben" id="" cols={30} rows={10} onChange={handleInputChange}></textarea>
                   </div>

                   <div className={classes.form_container_step_three_confirm}>
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
                )
              }
            </div>

            </>
          )
        }
      </form>
       {/* actions */}
       <div className={classes.form_container_actions}>
          <button onClick={goToPrevStep}>{
            currentStep === 0  ? 'Cancel' :'Back'
          }</button>
          <button onClick={currentStep === 3 ? handleSubmit : goToNextStep} disabled={uniLevel.length === 0 && currentStep === 2}>
            {
              currentStep === 3 ? 'Submit' : 'Next'
            }
            {
                loading && (
                  <LoadingSpinner/>
                )
            }
          </button>
        </div>
    </section>
  )
}
