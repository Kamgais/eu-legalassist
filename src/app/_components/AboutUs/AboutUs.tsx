import classes from './aboutUs.module.scss'
import Image from 'next/image'

function AboutUs() {
  return (
    <div className={classes.aboutUs_container}>
      <div className={classes.left}>
        <h2>About us</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Libero nulla sit sed fringilla odio leo id sagittis urna.
           Auctor vestibulum et laoreet et viverra dolor. Pulvinar consectetur at turpis accumsan tincidunt ridiculus
           elit nibh. Ut aliquam quis aliquam in. Tincidunt iaculis elementum diam sed eget. Quisque egestas platea mus
           iaculis pellentesque nisl egestas senectus quis. Viverra nulla diam lorem eu nec est. Bibendum dignissim lobortis
            molestie diam sed. Vestibulum morbi faucibus id integer nisl in tempus at.
      Urna at diam urna euismod. Mollis et sit laoreet sodales risus nisl interdum sollicitudin. Porta faucibus ut est dui amet
            elementum eu nunc. Eget enim sollicitudin feugiat ut eget et ullamcorper. Placerat pellentesque in lectus ut parturient.</p>
      </div>
      <div className={classes.right}>
        <Image src="https://images.pexels.com/photos/7842545/pexels-photo-7842545.jpeg" alt='' width={300} height={400}/>
      </div>
    </div>
  )
}

export default AboutUs
