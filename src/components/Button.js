import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const text = props.children;
   const { onClick, disabled } = props;
   
   const buttonConfig = {
      "button": true,
      "button--confirm": props.confirm,
      "button--danger": props.danger
   }
   const buttonClass = classNames(buttonConfig);

   return (
      <button 
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}>{text}</button>
   );
}
