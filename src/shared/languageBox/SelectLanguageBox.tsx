"use client";
import { FaAngleDown } from 'react-icons/fa';
import classes from './selectLanguage.module.scss';
import { useState } from 'react';

export default function SelectLanguageBox() {
  const [isOpen, setOpen] = useState(false);
  const openBox = () => {
    setOpen((isOpen) => !isOpen)
  }
  return (
    <div className={classes.topBar_head_actions_language_box}>
    <p onClick={openBox} style={{
      cursor: 'pointer'
    }}>Language <FaAngleDown/></p>
     {
      isOpen && (
        <div className={classes.topBar_head_actions_select_options}>
        <p>German</p>
        <p>French</p>
        <p>English</p>
      </div>
      )
     }
 </div>
  )
}
