"use client";

import classes from './landingCover.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingCover() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/form');
  }
  return (
    <div className={classes.headContent_container}>
      <div className={classes.headContent_infos}>

          <h2>Welcome to EU Legal assist </h2>
          <p>German legal documents in English and French for every immigrant.
            Understand your rights and declare your taxes without language barriers.
          </p>
      </div>
    </div>
  )
}
