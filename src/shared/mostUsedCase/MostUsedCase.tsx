import Link from 'next/link'
import classes from './mostUsedCase.module.scss'
import { FaChevronRight } from "react-icons/fa";

type Props = {
  title: string,
  cases: string[]
}

export default function MostUsedCase({title, cases}: Props) {
  return (
    <div className={classes.mostUsedCase_container}>
      <h2>{title}</h2>
      <div className={classes.mostUsedCase_cases}>
        {
          cases.map((c:string, index: number) => (
            <Link key={index} href={c}  style={{
              textDecoration: 'none',
              color: '$primaryBlue',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FaChevronRight/>
              {c}
              </Link>
          ))
        }
      </div>
    </div>
  )
}
