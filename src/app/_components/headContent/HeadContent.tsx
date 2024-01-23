import classes from './headContent.module.scss';
import Image from 'next/image';

export default function HeadContent() {
  return (
    <div className={classes.headContent_container}>
      <div className={classes.headContent_infos}>

          <h2>Lorem ipsum dolor sit amet consectetur. </h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Voluptas iure ullam veritatis architecto saepe
            quisquam blanditiis provident optio totam doloribus animi
             sequi fugit aliquid odit doloremque numquam qui, labore
             sint impedit quae. Veritatis cum aspernatur nam quasi
             voluptatum maiores exercitationem deserunt magni nesciun</p>
              <div className={classes.headContent_action}>
              <button>Lorem Ipsum</button>
              </div>

      </div>
    </div>
  )
}
