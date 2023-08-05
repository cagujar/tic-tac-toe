import React from 'react';
import "./Box.css";

const Box = ({ value, onClick}) => {
  // if value is equal to X so the classname is box x otherwise, box o
  const style = value === "X" ? "box x" : "box o";
  return (
    <div>
      <button className={style} onClick={onClick}>{value}</button>
    </div>
  )
}

export default Box
