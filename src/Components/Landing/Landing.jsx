import { NavLink } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
  return (
    <div className={style.contenedor}>
      <h1>Countries Dreams</h1>
      <button className={style.access}>
        <NavLink to="/home" className={style.link}>HOME</NavLink>
      </button>
    </div>
  );
};

export default Landing;
