import ServiceArrow from '@/shared/serviceArrow/ServiceArrow'
import classes from './serviceOffer.module.scss'


const services = [
  {
    name: "Schufa Removal"
  },
  {
    name: "Skilled Worker visa"
  },
  {
    name: "Student visa"
  },
  {
    name: "Translation of documents"
  },
  {
    name:"certifications of documents"
  },
  {
    name: "Appeal and complaint letter"
  },
  {
    name: "Famillie zusammenführen"
  },
  {
    name: "Kinderzuschlag"
  }
]

function ServiceOffer() {
  return (
    <div className={classes.serviceOffer_container}>
      <h2>Service Offer</h2>
      <ul>
        {
          services.map((service:any, index:any) => (
            <li key={index}>
              0{index+1} {service.name}  <ServiceArrow/>

            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ServiceOffer
