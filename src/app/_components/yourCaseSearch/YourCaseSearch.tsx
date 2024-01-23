import TitleWithBar from '@/shared/titleWithBar/TitleWithBar';
import classes from './yourCaseSearch.module.scss';

export default function YourCaseSearch() {
  return (
    <div className={classes.yourCaseSearch_container}>
      <TitleWithBar title='Search for your Document / Case'/>

      <div className={classes.yourCaseSearch_infos}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque voluptatibus dolorem iure minima?</p>
      </div>

      <div className={classes.yourCaseSearch_search}>
        <input type="text"  placeholder='Search your document or case' />
        <button>Search</button>
      </div>

    </div>
  )
}
